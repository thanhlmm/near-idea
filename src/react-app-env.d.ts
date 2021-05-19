/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="near-api-js" />

import { Contract, WalletConnection } from "near-api-js";

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly PUBLIC_URL: string;
    readonly VITE_APP_VERSION: string;
    readonly CONTRACT_NAME: string;
  }
}

declare global {
  interface Window {
    walletConnection: WalletConnection;
    accountId?: string;
    contract: Contract
  }
}

// declare module 'near-api-js/dist/near-api-js.min.js'