import { addEntity, addReview } from '..'
import { storage, Context } from 'near-sdk-as'

describe('Entity ', () => {
  it('should be add', () => {
    addEntity('https://twitter.com/elonmusk')
    storage.get<string>(Context.sender)
  })
})
