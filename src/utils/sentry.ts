import * as Sentry from '@sentry/react'

export const initSentry = () => {
  const isDev = import.meta.env.DEV
  const isProd = import.meta.env.PROD

  const dsn = import.meta.env.VITE_SENTRY_DSN
  const environment =
    import.meta.env.VITE_SENTRY_ENV ??
    (isProd ? 'production' : isDev ? 'development' : import.meta.env.MODE)

  const enableInDev = import.meta.env.VITE_SENTRY_ENABLE_IN_DEV === 'true'

  if (!dsn) {
    console.warn('Sentry DSN not found. Error tracking is disabled.')
    return
  }

  if (isDev && !enableInDev) {
    console.warn(
      'Sentry is disabled in development. Set VITE_SENTRY_ENABLE_IN_DEV=true to enable.',
    )
    return
  }

  Sentry.init({
    dsn,
    environment,
    enabled: isProd || enableInDev,
    enableLogs: isDev,
    integrations: [
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: isProd ? 1.0 : 0.0,
    // Session Replay
    replaysSessionSampleRate: isProd ? 0.1 : 0.0, // 10% of sessions
    replaysOnErrorSampleRate: isProd ? 1.0 : 0.0, // 100% of sessions with errors
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
