import { context, PersistentUnorderedMap, PersistentVector, u128 } from "near-sdk-core";

export const entities = new PersistentUnorderedMap<string, Entity>("entity")
export const reviews = new PersistentVector<Review>("review")
export const sponsors = new PersistentVector<Sponsor>("sponsor")

@nearBindgen
export class Entity {
  url: string;
  detail: string;
  bounty: u128;
  author: string;

  constructor(url: string, detail: string, bounty: u128) {
    this.url = url;
    this.detail = detail;
    this.bounty = bounty;
    this.author = context.sender;
  }
}

@nearBindgen
export class Review {
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

  up(): Review {
    this.upVote.push(context.sender);
    return this;
  }

  down(): Review {
    this.downVote.push(context.sender);
    return this;
  }
}

@nearBindgen
export class ReviewInterface {
  id: number;
  entity: string;
  detail: string;
  upVote: string[]; // TODO: Change this to hand clap is better?
  downVote: string[];
  author: string;

  constructor(review: Review, id: number) {
    this.id = id;
    this.entity = review.entity;
    this.detail = review.detail;
    this.upVote = review.upVote;
    this.downVote = review.downVote;
    this.author = review.author;
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