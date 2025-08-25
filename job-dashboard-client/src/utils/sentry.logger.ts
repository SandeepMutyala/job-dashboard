import * as Sentry from '@sentry/react';

export const logMessage = (msg: string) => {
  Sentry.captureMessage(msg);
};

export const logError = (err: unknown) => {
  Sentry.captureException(err);
};
