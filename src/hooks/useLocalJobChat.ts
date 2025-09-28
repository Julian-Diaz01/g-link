import { useState, useCallback } from 'react'

// Types for the Local Chat API
export interface LocalChatSession {
  session_id: string
  company_name?: string
  job_title?: string
  job_url?: string
  job_description?: string
  cv_file_name?: string
  cv_text?: string
  status: 'active' | 'archived'
  messages?: LocalChatMessage[]
  created_at: string
}

export interface LocalChatMessage {
  role: 'user' | 'assistant'
  message: string
  timestamp: string
}

export interface StartChatData {
  cvFile: File
  jobUrl?: string
  jobText?: string
}

export interface StartChatResponse {
  success: boolean
  session: LocalChatSession
  welcomeMessage: string
}

export interface SendMessageResponse {
  success: boolean
  session: LocalChatSession
  response: string
}

export interface GeneratePdfResponse {
  success: boolean
  message: string
  downloadUrl: string
}

// Custom hook for Local Job Chat API
export const useLocalJobChat = (baseUrl: string = 'http://localhost:1010') => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentSession, setCurrentSession] = useState<LocalChatSession | null>(
    null,
  )
  const [allSessions, setAllSessions] = useState<LocalChatSession[]>([])

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

  // Load sessions from localStorage
  const loadSessionsFromStorage = useCallback((): LocalChatSession[] => {
    try {
      const stored = localStorage.getItem('jobChatSessions')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error loading sessions from storage:', error)
      return []
    }
  }, [])

  // Save sessions to localStorage
  const saveSessionsToStorage = useCallback((sessions: LocalChatSession[]) => {
    try {
      localStorage.setItem('jobChatSessions', JSON.stringify(sessions))
    } catch (error) {
      console.error('Error saving sessions to storage:', error)
    }
  }, [])

  // Start new chat session
  const startChat = useCallback(
    async (data: StartChatData): Promise<StartChatResponse> => {
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

        const response = await fetch(`${baseUrl}/chat/start`, {
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

        const result: StartChatResponse = await response.json()

        // Add welcome message to session
        const sessionWithWelcome = {
          ...result.session,
          messages: [
            {
              role: 'assistant' as const,
              message: result.welcomeMessage,
              timestamp: new Date().toISOString(),
            },
          ],
        }

        // Save to localStorage
        const existingSessions = loadSessionsFromStorage()
        const updatedSessions = [sessionWithWelcome, ...existingSessions]
        saveSessionsToStorage(updatedSessions)
        setAllSessions(updatedSessions)
        setCurrentSession(sessionWithWelcome)

        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to start chat'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [baseUrl, loadSessionsFromStorage, saveSessionsToStorage],
  )

  // Send message to chat
  const sendMessage = useCallback(
    async (
      session: LocalChatSession,
      message: string,
    ): Promise<SendMessageResponse> => {
      setIsLoading(true)
      setError(null)

      try {
        const result = await apiCall<SendMessageResponse>('/chat/message', {
          method: 'POST',
          body: JSON.stringify({ session, message }),
        })

        // Update localStorage
        const existingSessions = loadSessionsFromStorage()
        const updatedSessions = existingSessions.map((s) =>
          s.session_id === result.session.session_id ? result.session : s,
        )
        saveSessionsToStorage(updatedSessions)
        setAllSessions(updatedSessions)
        setCurrentSession(result.session)

        return result
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to send message'
        setError(errorMessage)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [apiCall, loadSessionsFromStorage, saveSessionsToStorage],
  )

  // Load chat session from localStorage
  const loadChatSession = useCallback(
    (sessionId: string): LocalChatSession | null => {
      const sessions = loadSessionsFromStorage()
      const session = sessions.find((s) => s.session_id === sessionId)
      if (session) {
        setCurrentSession(session)
        return session
      }
      return null
    },
    [loadSessionsFromStorage],
  )

  // Get all sessions from localStorage
  const getAllSessions = useCallback((): LocalChatSession[] => {
    const sessions = loadSessionsFromStorage()
    setAllSessions(sessions)
    return sessions
  }, [loadSessionsFromStorage])

  // Delete session from localStorage
  const deleteSession = useCallback(
    (sessionId: string): void => {
      const sessions = loadSessionsFromStorage()
      const updatedSessions = sessions.filter((s) => s.session_id !== sessionId)
      saveSessionsToStorage(updatedSessions)
      setAllSessions(updatedSessions)

      // Clear current session if it matches
      if (currentSession?.session_id === sessionId) {
        setCurrentSession(null)
      }
    },
    [loadSessionsFromStorage, saveSessionsToStorage, currentSession],
  )

  // Archive session (mark as completed)
  const archiveSession = useCallback(
    (sessionId: string, coverLetter: string): void => {
      const sessions = loadSessionsFromStorage()
      const updatedSessions = sessions.map((s) => {
        if (s.session_id === sessionId) {
          return {
            ...s,
            status: 'archived' as const,
            messages: [
              ...(s.messages || []),
              {
                role: 'assistant' as const,
                message: `${coverLetter}\n\nCover letter finalized and saved.`,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return s
      })
      saveSessionsToStorage(updatedSessions)
      setAllSessions(updatedSessions)
      if (currentSession?.session_id === sessionId) {
        setCurrentSession(
          updatedSessions.find((s) => s.session_id === sessionId) || null,
        )
      }
    },
    [loadSessionsFromStorage, saveSessionsToStorage, currentSession],
  )

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

  // Clear current session
  const clearCurrentSession = useCallback(() => {
    setCurrentSession(null)
  }, [])

  return {
    // State
    isLoading,
    error,
    currentSession,
    allSessions,

    // Actions
    startChat,
    sendMessage,
    loadChatSession,
    getAllSessions,
    deleteSession,
    archiveSession,
    checkHealth,
    clearError,
    clearCurrentSession,
  }
}
