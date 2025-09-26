import React, { useState, useRef, useEffect } from 'react'
import { useLocalJobChat, StartChatData } from '../hooks/useLocalJobChat'

interface LocalJobChatProps {
  baseUrl?: string
  className?: string
}

export const LocalJobChat: React.FC<LocalJobChatProps> = ({
  baseUrl = 'http://localhost:1010',
  className = '',
}) => {
  const {
    isLoading,
    error,
    currentSession,
    allSessions,
    startChat,
    sendMessage,
    loadChatSession,
    generatePdf,
    downloadPdf,
    getAllSessions,
    deleteSession,
    archiveSession,
    checkHealth,
    clearError,
    clearCurrentSession,
  } = useLocalJobChat(baseUrl)

  // Form state
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobUrl, setJobUrl] = useState('')
  const [jobText, setJobText] = useState('')
  const [inputMethod, setInputMethod] = useState<'url' | 'text'>('url')
  const [currentMessage, setCurrentMessage] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [showSaveForm, setShowSaveForm] = useState(false)

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messageInputRef = useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentSession?.messages])

  // Load all sessions on component mount
  useEffect(() => {
    getAllSessions()
    checkHealth().catch(console.error)
  }, [getAllSessions, checkHealth])

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

  // Handle starting new chat
  const handleStartChat = async (event: React.FormEvent) => {
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
      const chatData: StartChatData = {
        cvFile,
        ...(inputMethod === 'url'
          ? { jobUrl: jobUrl.trim() }
          : { jobText: jobText.trim() }),
      }

      await startChat(chatData)

      // Reset form
      setCvFile(null)
      setJobUrl('')
      setJobText('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      console.error('Failed to start chat:', err)
    }
  }

  // Handle sending message
  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!currentSession || !currentMessage.trim()) {
      return
    }

    try {
      await sendMessage(currentSession, currentMessage.trim())
      setCurrentMessage('')
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  // Handle saving cover letter
  const handleSaveCoverLetter = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!currentSession || !coverLetter.trim()) {
      return
    }

    try {
      archiveSession(currentSession.session_id, coverLetter.trim())
      setShowSaveForm(false)
      setCoverLetter('')
    } catch (err) {
      console.error('Failed to save cover letter:', err)
    }
  }

  // Handle generating PDF
  const handleGeneratePdf = async () => {
    if (!currentSession) return

    // Find the saved cover letter from messages
    const coverLetterMessage = currentSession.messages?.find(
      (msg) =>
        msg.role === 'assistant' &&
        msg.message.includes('Cover letter finalized'),
    )

    if (!coverLetterMessage) {
      alert('Please save a cover letter first.')
      return
    }

    // Extract the cover letter from the message
    // The cover letter should be in the message content before "Cover letter finalized"
    const messageContent = coverLetterMessage.message
    const coverLetterText = messageContent
      .replace('\n\nCover letter finalized and saved.', '')
      .trim()

    if (!coverLetterText) {
      alert('No cover letter content found.')
      return
    }

    try {
      await generatePdf(currentSession, coverLetterText)
    } catch (err) {
      console.error('Failed to generate PDF:', err)
    }
  }

  // Handle downloading PDF
  const handleDownloadPdf = async () => {
    if (!currentSession) return

    try {
      await downloadPdf(currentSession.session_id)
    } catch (err) {
      console.error('Failed to download PDF:', err)
    }
  }

  // Handle loading existing session
  const handleLoadSession = (sessionId: string) => {
    loadChatSession(sessionId)
  }

  // Handle deleting session
  const handleDeleteSession = (sessionId: string) => {
    if (window.confirm('Are you sure you want to delete this chat session?')) {
      deleteSession(sessionId)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'archived':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className={`max-w-6xl mx-auto p-8 ${className}`}>
      <div className="p-2 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-3">
          Job Application Chat Assistant
        </h1>
        <p className="text-gray-300 text-lg">
          Upload your CV and job details to start an interactive chat for cover
          letter assistance. All data stays local for privacy.
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-6 p-6 bg-red-900 border-l-4 border-red-400 rounded-lg">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Chat Sessions */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-gray-700 rounded-xl">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Local Chat Sessions
            </h2>

            {allSessions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No chat sessions found
              </p>
            ) : (
              <div className="space-y-3">
                {allSessions.map((session) => (
                  <div
                    key={session.session_id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                      currentSession?.session_id === session.session_id
                        ? 'bg-blue-900 border-blue-600'
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-600'
                    }`}
                    onClick={() => handleLoadSession(session.session_id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {session.company_name || 'Unknown Company'}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {session.cv_file_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(session.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}
                        >
                          {session.status}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteSession(session.session_id)
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat Interface */}
        <div className="lg:col-span-2">
          {!currentSession ? (
            /* Start New Chat Form */
            <div className="p-8 bg-gray-700 rounded-xl">
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
                Start New Chat
              </h2>

              <form onSubmit={handleStartChat} className="space-y-6">
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
                      className="block w-full text-sm text-gray-300 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0a1930] file:text-[#f5c422] rounded-lg p-3 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f5c422] focus:border-transparent"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#0a1930] border-[#f5c422] border-1 text-[#f5c422] py-4 px-6 rounded-lg focus:ring-offset-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg shadow-lg"
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
                      Starting Chat...
                    </span>
                  ) : (
                    'Start Chat'
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Chat Interface */
            <div className="flex flex-col h-[600px] bg-gray-700 rounded-xl">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-600 bg-gray-800 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {currentSession.company_name || 'Unknown Company'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {currentSession.cv_file_name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentSession.status)}`}
                    >
                      {currentSession.status}
                    </span>
                    {currentSession.status === 'archived' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleGeneratePdf}
                          disabled={isLoading}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                        >
                          Generate PDF
                        </button>
                        <button
                          onClick={handleDownloadPdf}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                        >
                          Download PDF
                        </button>
                      </div>
                    )}
                    <button
                      onClick={clearCurrentSession}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentSession.messages?.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-600 text-gray-100'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-600 text-gray-100 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              {currentSession.status === 'active' && (
                <div className="p-4 border-t border-gray-600 bg-gray-800 rounded-b-xl">
                  <form onSubmit={handleSendMessage} className="flex space-x-3">
                    <textarea
                      ref={messageInputRef}
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your message..."
                      rows={2}
                      className="flex-1 px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                      disabled={isLoading}
                    />
                    <button
                      type="submit"
                      disabled={isLoading || !currentMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Save Cover Letter Form */}
              {currentSession.status === 'active' && (
                <div className="p-4 border-t border-gray-600 bg-gray-800">
                  {!showSaveForm ? (
                    <button
                      onClick={() => setShowSaveForm(true)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      Save Cover Letter
                    </button>
                  ) : (
                    <form
                      onSubmit={handleSaveCoverLetter}
                      className="space-y-3"
                    >
                      <textarea
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Enter your final cover letter..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                        required
                      />
                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={isLoading || !coverLetter.trim()}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowSaveForm(false)
                            setCoverLetter('')
                          }}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocalJobChat
