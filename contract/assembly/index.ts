import { context, Context, logging, storage, u128 } from 'near-sdk-as'
import { entities, reviews, Entity, Review, Sponsor, sponsors } from './model';

const MIN_SPONSOR : u128 = u128.from('200000000000'); // TODO: Update me

// TODO: Init contract
// export function initContract() {
// }

export function addEntity(url: string): boolean {
  // TODO: Check if entity existed
  const newEntity = new Entity(url, context.attachedDeposit);
  entities.set(url, newEntity);

  return true;
}

export function addReview(url: string, detail: string): boolean {
  const entity = entities.get(url, null);
  assert(entity, "This entity is not existed");

  const newReview = new Review(url, detail);
  reviews.push(newReview);

  return true;
}

export function upVote(reviewId: i32): boolean {
  assert(reviews.containsIndex(reviewId), "This comment is not exited");
  const review = reviews[reviewId];
  const newReview = review.up();
  reviews.replace(reviewId, newReview);

  if (context.attachedDeposit >= MIN_SPONSOR) {
    // Add sponsor
    const newSponsor = new Sponsor(reviewId);
    sponsors.push(newSponsor);
  }

  return true;
}

export function downVote(reviewId: i32): boolean {
  assert(reviews.containsIndex(reviewId), "This comment is not exited");
  const review = reviews[reviewId];
  const newReview = review.down();
  reviews.replace(reviewId, newReview);

  if (context.attachedDeposit >= MIN_SPONSOR) {
    // Add sponsor
    const newSponsor = new Sponsor(reviewId);
    sponsors.push(newSponsor);
  }

  return true;
}

export function getEntities(): Entity[] {
  return entities.values();
}

export function getEntityReview(url: string): Review[] {
  const result : Review[] = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    if (review.entity == url) {
      result.push(review);
    }
  }

  return result;
}

export function getReviewSponsors(reviewId: i32): Sponsor[] {
  const result : Sponsor[] = [];
  for (let i = 0; i < sponsors.length; i++) {
    const sponsor = sponsors[i];
    if (sponsor.reviewId == reviewId) {
      result.push(sponsor);
    }
  }

  return result;
}