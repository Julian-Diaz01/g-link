import * as Sentry from '@sentry/react'

/**
 * Initialize Sentry for error tracking
 *
 * To get your DSN:
 * 1. Go to https://sentry.io and create an account/project
 * 2. Copy your DSN from the project settings
 * 3. Add it to your .env file as VITE_SENTRY_DSN
 */
export const initSentry = () => {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) {
    console.warn('Sentry DSN not found. Error tracking is disabled.')
    return
  }

  Sentry.init({
    dsn,
    enableLogs: true,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      // send console.log, console.warn, and console.error calls as logs to Sentry
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of transactions (adjust in production)
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    environment: import.meta.env.MODE || 'development',
  })
}

/**
 * Helper function to manually capture errors
 *
 * Usage:
 * import { captureError } from './utils/sentry'
 *
 * try {
 *   // some code
 * } catch (error) {
 *   captureError(error, { context: 'additional info' })
 * }
 */
export const captureError = (
  error: Error,
  context?: Record<string, unknown>,
) => {
  Sentry.captureException(error, {
    extra: context,
  })
}

/**
 * Helper function to capture messages (non-error events)
 *
 * Usage:
 * import { captureMessage } from './utils/sentry'
 *
 * captureMessage('Something important happened', 'info')
 */
export const captureMessage = (
  message: string,
  level: 'info' | 'warning' | 'error' = 'info',
) => {
  Sentry.captureMessage(message, level)
}

/**
 * Sentry logger for structured logging
 *
 * Usage:
 * import { logger } from './utils/sentry'
 *
 * logger.trace("Starting database connection", { database: "users" });
 * logger.debug(logger.fmt`Cache miss for user: ${userId}`);
 * logger.info("Updated profile", { profileId: 345 });
 * logger.warn("Rate limit reached for endpoint", { endpoint: "/api/results/" });
 * logger.error("Failed to process payment", { orderId: "order_123" });
 * logger.fatal("Database connection pool exhausted", { activeConnections: 100 });
 */
export const { logger } = Sentry
