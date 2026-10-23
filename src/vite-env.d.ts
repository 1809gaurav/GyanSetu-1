/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL?: string;
  readonly VITE_EXTENSION_URL?: string;
  readonly VITE_PRIVACY_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_CONTACT_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
  readonly VITE_YOUTUBE_URL?: string;
  readonly VITE_X_URL?: string;
  readonly VITE_HACKATHON_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
