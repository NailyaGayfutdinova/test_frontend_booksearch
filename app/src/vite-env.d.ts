/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_BASE_APIKEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
