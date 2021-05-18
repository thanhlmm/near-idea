import { u128, VMContext } from 'near-sdk-as';
import { addEntity, addReview, downVote, getEntityReview, getReviewSponsors, upVote } from '..';
import { entities, reviews } from '../model';

const alice = "alice";
const bob = "bob";
const elonEntityUrl = "https://twitter.com/elonmusk";
const secretEntityUrl = "https://twitter.com/SecretsOfCrypto";
const reviewDetail = "He always make profit based on his influence, make the market up and down";
const sponsorAmount = 3000000000000000000000;

describe("Entity ", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(alice);
  });

  it('should added new entity', () => {
    addEntity(elonEntityUrl);
    expect(entities.get(elonEntityUrl)).toBeTruthy("added entity")
  });

  it('should added new entity', () => {
    VMContext.setAttached_deposit(u128.from(3000000000000000000000))
    addEntity(secretEntityUrl);
    expect(entities.get(secretEntityUrl)).toBeTruthy("added entity")
    expect(entities).toHaveLength(1, "there is 1 entity now")
  });

});

describe("Reviews ", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(bob);
    addEntity(secretEntityUrl);
  });

  it('should added new review', () => {
    addReview(secretEntityUrl, reviewDetail)
    expect(reviews.last.detail).toBe(reviewDetail);
  })

  it('should added new review', () => {
    addReview(secretEntityUrl, reviewDetail)
    expect(reviews.last.detail).toBe(reviewDetail);
  })

  it('should return all reviews of Secret', () => {
    addReview(secretEntityUrl, reviewDetail)
    addReview(secretEntityUrl, reviewDetail)
    expect(getEntityReview(secretEntityUrl)).toHaveLength(2);
  })
});

describe("Interactive review ", () => {
  beforeEach(() => {
    VMContext.setSigner_account_id(bob);
    addEntity(secretEntityUrl);
    addReview(secretEntityUrl, reviewDetail)
  });

  it('should up vote a comment', () => {
    upVote(0);
    const reviews = getEntityReview(secretEntityUrl);
    expect(reviews).toHaveLength(1, "there is 1 review now");
    expect(reviews[0].upVote).toIncludeEqual(bob, "We have Bob in Up Vote list");
  });

  it('should up vote with sponsor', () => {
    VMContext.setAttached_deposit(u128.from(sponsorAmount));
    upVote(0);
    expect(getReviewSponsors(0)).toHaveLength(1, "We have 1 sponsor here");
    expect(getReviewSponsors(0)[0].amount).toBe(u128.from(sponsorAmount), "and have valid sponsor amount");
  });

  it('should down vote a comment', () => {
    VMContext.setSigner_account_id(alice);
    downVote(0);
    const reviews = getEntityReview(secretEntityUrl);
    expect(reviews).toHaveLength(1, "there is 1 review now");
    expect(reviews[0].downVote).toIncludeEqual(alice, "We have Alice in Down Vote list")
  });
})
