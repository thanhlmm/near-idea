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

interface IEntity {
  url: string;
  detail: string;
  bounty: number;
  author: string;
  rewardedFor: number;
}

interface IReview {
  id: number;
  entity: string;
  detail: string;
  upVote: string[]; // TODO: Change this to hand clap is better?
  downVote: string[];
  author: string;
}

interface ISponsor {
  reviewId: number;
  amount: number;
}
interface IContractInterface extends Contract {
  addEntity: (...any) => Promise<boolean>;
  addReview: ({ url: string, detail: string }) => Promise<boolean>;
  upVote: ({ reviewId: number }) => Promise<boolean>;
  downVote: ({ reviewId: number }) => Promise<boolean>;
  rewardBounty: ({ url: string, reviewId: number }) => Promise<boolean>;

  getEntities: () => Promise<IEntity[]>,
  getEntityReview: ({ url: string }) => Promise<IReview[]>,
  getReviewSponsors: ({ reviewId: number }) => Promise<ISponsor[]>
}

declare global {
  interface Window {
    walletConnection: WalletConnection;
    accountId?: string;
    contract: IContractInterface
  }
}

// declare module 'near-api-js/dist/near-api-js.min.js'