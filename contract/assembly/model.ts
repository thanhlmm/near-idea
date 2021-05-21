import { ContractPromiseBatch } from "near-sdk-as";
import { context, ContractPromise, logging, PersistentUnorderedMap, PersistentVector, u128 } from "near-sdk-core";

export const entities = new PersistentUnorderedMap<string, Entity>("entity")
export const reviews = new PersistentVector<Review>("review")
export const sponsors = new PersistentVector<Sponsor>("sponsor")

const MIN_SPONSOR: u128 = u128.from(2 * 10 ** 24); // TODO: Update me

@nearBindgen
export class Entity {
  url: string;
  detail: string;
  bounty: u128;
  author: string;
  rewardedFor: i32 = -1;

  constructor(url: string, detail: string, bounty: u128) {
    this.url = url;
    this.detail = detail;
    this.bounty = bounty;
    this.author = context.sender;
  }

  giveBounty(reviewId: i32): Entity {
    assert(this.author == context.sender, "You must be the author of this question to reward the bounty");
    assert(this.bounty >= MIN_SPONSOR, "There is no bounty for this question");
    assert(reviews.containsIndex(reviewId), "This comment is not exited");
    const review = reviews[reviewId];

    // TODO: Send the bounty to the reviewer

    const reviewAuthor = ContractPromiseBatch.create(review.author);
    reviewAuthor.transfer(this.bounty);
    this.rewardedFor = reviewId;

    return this;
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