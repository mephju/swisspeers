import fetchPosts, {fetchPostsStarted} from './fetchPosts'

import {initialState} from '../../store/reducer'

it('should update loading prop', () => {

  const state = fetchPosts.reducer(
    initialState,
    {type: fetchPostsStarted}
  )

  expect(state.posts.loading).toEqual(true)

})