import React, { useState, useRef, useEffect } from 'react'
import {
  useJobApplicant,
  ProcessJobData,
  JobRecord,
} from '../hooks/useJobApplication'

interface JobApplicantComponentProps {
  baseUrl?: string
  className?: string
}

export const JobApplicantComponent: React.FC<JobApplicantComponentProps> = ({
  baseUrl = 'http://localhost:1010',
  className = '',
}) => {
  const {
    isLoading,
    error,
    currentJob,
    allJobs,
    processJob,
    getAllJobs,
    checkHealth,
    clearError,
  } = useJobApplicant(baseUrl)

  // Form state
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobUrl, setJobUrl] = useState('')
  const [jobText, setJobText] = useState('')
  const [customQuestion, setCustomQuestion] = useState('')
  const [inputMethod, setInputMethod] = useState<'url' | 'text'>('url')

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load all jobs on component mount
  useEffect(() => {
    getAllJobs().catch(console.error)
    checkHealth().catch(console.error)
  }, [getAllJobs, checkHealth])

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please select a PDF file for your CV.')
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert('File size must be less than 10MB.')
        return
      }
      setCvFile(file)
    }
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!cvFile) {
      alert('Please select a CV file.')
      return
    }

    if (inputMethod === 'url' && !jobUrl.trim()) {
      alert('Please enter a job URL.')
      return
    }

    if (inputMethod === 'text' && !jobText.trim()) {
      alert('Please enter job description text.')
      return
    }

    try {
      const jobData: ProcessJobData = {
        cvFile,
        ...(inputMethod === 'url'
          ? { jobUrl: jobUrl.trim() }
          : { jobText: jobText.trim() }),
        ...(customQuestion.trim() && { customQuestion: customQuestion.trim() }),
      }

      await processJob(jobData)

      // Reset form
      setCvFile(null)
      setJobUrl('')
      setJobText('')
      setCustomQuestion('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Failed to process job:', err)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'processing':
        return 'text-blue-600 bg-blue-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className={`max-w-6xl mx-auto p-8 ${className}`}>
      <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <div className="p-8 border-b border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-3">
            Job Application Cover Letter Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Upload your CV and job details to generate a personalized cover
            letter
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-8 mt-6 p-6 bg-red-900 border-l-4 border-red-400 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-red-100">{error}</p>
                <button
                  onClick={clearError}
                  className="mt-3 px-4 py-2 text-sm font-medium text-red-100 bg-red-700 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current Job Progress */}
        {currentJob && (
          <div className="mx-8 mt-8 p-8 bg-gradient-to-r from-blue-900 to-indigo-900 border border-blue-700 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <svg
                className="w-6 h-6 text-blue-300 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Current Job Progress
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <span className="text-sm font-medium text-gray-300">
                  Job ID:{' '}
                  <span className="font-mono text-white">
                    {currentJob.jobId}
                  </span>
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentJob.status)}`}
                >
                  {currentJob.status}
                </span>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700">
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${currentJob.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span className="font-medium">
                    {currentJob.progress}% complete
                  </span>
                  <span className="text-gray-400">{currentJob.step}</span>
                </div>
              </div>

              {currentJob.error && (
                <div className="p-4 bg-red-900 border border-red-700 rounded-lg">
                  <div className="flex items-start w-2">
                    <svg
                      className="w-5 h-5 text-red-300 mt-0.5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-sm text-red-100 font-medium">
                      Error: {currentJob.error}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Job Submission Form */}
        <div className="mx-8 mt-8 p-8 bg-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 text-green-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Submit New Job Application
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* CV File Upload */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-600">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                CV File (PDF only)
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-blue-100 hover:file:bg-blue-500 file:transition-colors file:duration-200 border border-gray-600 rounded-lg p-3 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              {cvFile && (
                <div className="mt-3 p-3 bg-green-900 border border-green-700 rounded-lg">
                  <p className="text-sm text-green-200 font-medium flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Selected: {cvFile.name}
                  </p>
                </div>
              )}
            </div>

            {/* Job Input Method */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-600">
              <label className="block text-sm font-semibold text-gray-200 mb-4">
                Job Information Source
              </label>
              <div className="flex space-x-6">
                <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                  <input
                    type="radio"
                    value="url"
                    checked={inputMethod === 'url'}
                    onChange={(e) =>
                      setInputMethod(e.target.value as 'url' | 'text')
                    }
                    className="mr-3 text-blue-400 focus:ring-blue-400"
                  />
                  <span className="text-sm font-medium text-gray-200">
                    Job URL
                  </span>
                </label>
                <label className="flex items-center p-3 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors duration-200">
                  <input
                    type="radio"
                    value="text"
                    checked={inputMethod === 'text'}
                    onChange={(e) =>
                      setInputMethod(e.target.value as 'url' | 'text')
                    }
                    className="mr-3 text-blue-400 focus:ring-blue-400"
                  />
                  <span className="text-sm font-medium text-gray-200">
                    Job Description Text
                  </span>
                </label>
              </div>
            </div>

            {/* Job URL Input */}
            {inputMethod === 'url' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-600">
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  Job URL
                </label>
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://example.com/job-posting"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>
            )}

            {/* Job Text Input */}
            {inputMethod === 'text' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-600">
                <label className="block text-sm font-semibold text-gray-200 mb-3">
                  Job Description
                </label>
                <textarea
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200 resize-vertical"
                  required
                />
              </div>
            )}

            {/* Custom Question */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-600">
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Custom Question (Optional)
              </label>
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="Leave empty for a random question"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Generate Cover Letter'
              )}
            </button>
          </form>
        </div>

        {/* Job History */}
        <div className="mx-8 mt-8 p-8 bg-gray-700 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <svg
              className="w-6 h-6 text-purple-400 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Job History
          </h2>

          {allJobs.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No jobs found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cover Letter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allJobs.map((job: JobRecord, i: number) => (
                    <tr key={job.job_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {i + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {job.cover_letter_json ? (
                          <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto max-w-xs">
                            {job.cover_letter_json?.coverLetter}
                          </pre>
                        ) : (
                          <span className="text-gray-400">No data</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(job.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobApplicantComponent
