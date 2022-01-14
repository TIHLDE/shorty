import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || 'https://3f6d83aa765543beb2f676ec1acc3d7f@o463914.ingest.sentry.io/6149564',
  tracesSampleRate: 1.0,
});
