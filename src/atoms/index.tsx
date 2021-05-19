import { IEntity, IReview } from "react-app-env";
import { atom, selector, selectorFamily } from "recoil";

export const entities = selector<IEntity[]>({
  key: 'entities',
  get: async ({ get }) => {
    return await window.contract.getEntities();
  },
});

export const entity = selectorFamily<IEntity | undefined, string>({
  key: 'entity',
  get: url => ({ get }) => {
    const list = get(entities);
    return list.find(item => item.url === url);
  }
})

export const reviews = selectorFamily<IReview[], string>({
  key: "review",
  get: (url) => async ({ get }) => {
    return await window.contract.getEntityReview({ url })
  },
})