import * as Sentry from '@sentry/react'

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
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0,
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
  })
}

export { Sentry }
export const { logger } = Sentry

export const trackMetric = (
  eventName: string,
  data?: Record<string, string | number | boolean>,
) => {
  Sentry.captureMessage(eventName, {
    level: 'info',
    tags: {
      metric: true,
      event: eventName,
      ...(data &&
        Object.fromEntries(
          Object.entries(data).map(([key, value]) => [key, String(value)]),
        )),
    },
    extra: data,
  })
}
