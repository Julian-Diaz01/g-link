import { useState, useCallback, useRef, useEffect } from 'react'

// Types for the API
export interface JobStatus {
  jobId: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number
  step: string
  error?: string
  createdAt: string
  completedAt?: string
}

export interface JobRecord {
  job_id: string
  company_name: string
  job_url?: string
  job_description?: string
  cv_file_name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  current_step: string
  cover_letter_json?: {
    coverLetter: string
    question: string
    answer: string
    generatedAt: string
    jobUrl?: string
    jobText?: string
  }
  cover_letter_pdf_url?: string
  random_question?: string
  random_answer?: string
  created_at: string
  completed_at?: string
  error_message?: string
}

export interface ProcessJobData {
  cvFile: File
  jobUrl?: string
  jobText?: string
  customQuestion?: string
}

export interface ProcessJobResponse {
  success: boolean
  message: string
  jobId: string
  status: string
}

export interface JobsResponse {
  success: boolean
  jobs: JobRecord[]
}

export interface JobResponse {
  success: boolean
  job: JobRecord
}

// Custom hook for Job Applicant API
export const useJobApplicant = (baseUrl: string = 'http://localhost:1010') => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentJob, setCurrentJob] = useState<JobStatus | null>(null)
  const [allJobs, setAllJobs] = useState<JobRecord[]>([])

  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Clear polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }
    }
  }, [])

  // Helper function to make API calls
  const apiCall = useCallback(
    async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          ...options,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.error ||
              `HTTP ${response.status}: ${response.statusText}`,
          )
        }

        return await response.json()
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(errorMessage)
        throw err
      }
    },
    [baseUrl],
  )

  // Process a job (upload CV and job details)
  const processJob = useCallback(
    async (data: ProcessJobData): Promise<ProcessJobResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        const formData = new FormData()
        formData.append('cv', data.cvFile)

        if (data.jobUrl) {
          formData.append('jobUrl', data.jobUrl)
        }

        if (data.jobText) {
          formData.append('jobText', data.jobText)
        }

        if (data.customQuestion) {
          formData.append('customQuestion', data.customQuestion)
        }

        const response = await fetch(`${baseUrl}/process`, {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.error ||
              `HTTP ${response.status}: ${response.statusText}`,
          )
        }

        const result: ProcessJobResponse = await response.json()

        // Start polling for this job
        if (result.jobId) {
          startPolling(result.jobId)
        }

        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to process job'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [baseUrl],
  )

  // Get job status
  const getJobStatus = useCallback(
    async (jobId: string): Promise<JobStatus> => {
      const result = await apiCall<JobStatus>(`/status/${jobId}`)
      setCurrentJob(result)
      return result
    },
    [apiCall],
  )

  // Get all jobs
  const getAllJobs = useCallback(async (): Promise<JobRecord[]> => {
    const result = await apiCall<JobsResponse>('/jobs')
    setAllJobs(result.jobs)
    return result.jobs
  }, [apiCall])

  // Get specific job
  const getJob = useCallback(
    async (jobId: string): Promise<JobRecord> => {
      const result = await apiCall<JobResponse>(`/jobs/${jobId}`)
      return result.job
    },
    [apiCall],
  )

  // Download cover letter
  const downloadCoverLetter = useCallback(
    async (jobId: string): Promise<void> => {
      try {
        const response = await fetch(`${baseUrl}/download/cover/${jobId}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || 'Failed to download cover letter')
        }

        // Create blob and download
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `cover-letter-${jobId}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to download cover letter'
        setError(errorMessage)
        throw err
      }
    },
    [baseUrl],
  )

  // Clean up job
  const cleanupJob = useCallback(
    async (jobId: string): Promise<void> => {
      await apiCall(`/cleanup/${jobId}`, { method: 'DELETE' })

      // Remove from current job if it matches
      if (currentJob?.jobId === jobId) {
        setCurrentJob(null)
      }

      // Remove from all jobs
      setAllJobs((prev) => prev.filter((job) => job.job_id !== jobId))
    },
    [apiCall, currentJob],
  )

  // Start polling for job status
  const startPolling = useCallback(
    (jobId: string) => {
      // Clear any existing polling
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current)
      }

      // Start new polling
      pollingIntervalRef.current = setInterval(async () => {
        try {
          const status = await getJobStatus(jobId)

          // Stop polling if job is completed or failed
          if (status.status === 'completed' || status.status === 'failed') {
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current)
              pollingIntervalRef.current = null
            }
          }
        } catch (err) {
          console.error('Error polling job status:', err)
          // Stop polling on error
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current)
            pollingIntervalRef.current = null
          }
        }
      }, 2000) // Poll every 2 seconds
    },
    [getJobStatus],
  )

  // Stop polling
  const stopPolling = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current)
      pollingIntervalRef.current = null
    }
  }, [])

  // Check health
  const checkHealth = useCallback(async (): Promise<{
    status: string
    message: string
  }> => {
    return await apiCall('/health')
  }, [apiCall])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    // State
    isLoading,
    error,
    currentJob,
    allJobs,

    // Actions
    processJob,
    getJobStatus,
    getAllJobs,
    getJob,
    downloadCoverLetter,
    cleanupJob,
    checkHealth,
    startPolling,
    stopPolling,
    clearError,
  }
}
