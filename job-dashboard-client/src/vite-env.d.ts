//Type declaration for Vite environment variables
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_APP_ENV?: string;
  readonly VITE_AUTH_URL: string;
  readonly VITE_USER_URL?: string;
  readonly VITE_COMPANY_URL: string;
  readonly VITE_JOB_URL?: string;
  readonly VITE_APPLICATION_URL: string;
  readonly VITE_NOTIFICATION_URL?: string;
  readonly VITE_AI_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
