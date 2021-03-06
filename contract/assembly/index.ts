import { context, Context, logging, storage, u128 } from 'near-sdk-as'
import { entities, reviews, Entity, Review, Sponsor, sponsors, ReviewInterface } from './model';

const MIN_SPONSOR: u128 = u128.from(2 * 10 ** 24); // TODO: Update me

// TODO: Init contract
// export function initContract() {
// }

export function addEntity(url: string, detail: string): boolean {
  // TODO: Check if entity existed
  const newEntity = new Entity(url, detail, context.attachedDeposit);
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
  assert(!review.downVote.includes(context.sender), "You have already up vote for this Idea");
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
  assert(!review.downVote.includes(context.sender), "You have already down vote for this Idea");
  const newReview = review.down();
  reviews.replace(reviewId, newReview);

  if (context.attachedDeposit >= MIN_SPONSOR) {
    // Add sponsor
    const newSponsor = new Sponsor(reviewId);
    sponsors.push(newSponsor);
  }

  return true;
}

export function rewardBounty(url: string, reviewId: i32): boolean {
  const entity = entities.get(url, null);
  assert(entity, "This entity is not existed");
  if (!entity) {
    return false;
  }

  const newEntity = entity.giveBounty(reviewId);
  entities.set(url, newEntity); // Store state back

  return true;
}

export function getEntities(): Entity[] {
  return entities.values();
}

export function getEntityReview(url: string): ReviewInterface[] {
  const result: ReviewInterface[] = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    if (review.entity == url) {
      result.push(new ReviewInterface(review, i));
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