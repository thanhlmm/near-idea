import { context, PersistentUnorderedMap, PersistentVector, u128 } from "near-sdk-core";

export const entities = new PersistentUnorderedMap<string, Entity>("entity")
export const reviews = new PersistentVector<Review>("review")
export const sponsors = new PersistentVector<Sponsor>("sponsor")

@nearBindgen
export class Entity {
  url: string;
  bounty: u128;
  author: string;

  constructor(url: string, bounty: u128) {
    this.url = url;
    this.bounty = bounty;
    this.author = context.sender;
  }
}

@nearBindgen
export class Review {
  id: string;
  entity: string;
  detail: string;
  upVote: string[]; // TODO: Change this to hand clap is better?
  downVote: string[];
  author: string;
  // TODO: Tips for this review

  constructor(entity: string, detail: string) {
    this.entity = entity;
    this.detail = detail;
    this.upVote = [];
    this.downVote = [];
    this.author = context.sender;
  }

  up(): void {
    this.upVote.push(context.sender);
  }

  down(): void {
    this.downVote.push(context.sender);
  }
}

@nearBindgen
export class Sponsor {
  reviewId: number;
  amount: u128;

  constructor(reviewId: number) {
    this.reviewId = reviewId;
    this.amount = context.attachedDeposit;
  }
}