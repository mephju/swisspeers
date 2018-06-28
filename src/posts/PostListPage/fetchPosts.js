import toPost from '../toPost'
import fromFetch from '../../utils/fromFetch'
import config from '../../config'

export const fetchPostsStarted = 'fetchPostsStarted'
export const fetchPostsFailed = 'fetchPostsFailed'
export const fetchPostsFinished = 'fetchPostsFinished'

const start = { type: fetchPostsStarted }
const fail = (payload) => ({ type: fetchPostsFailed, payload })
const finish = (payload) => {
  return ({ type: fetchPostsFinished, payload})
}

const action = (page = 0) => dispatch => {

  dispatch(start)

  fetch(config.api.posts(page))
  .then(fromFetch)
  .then(payload => dispatch(finish(payload, page)))
  .catch(error => dispatch(fail(error)))
}

const reactions = {
  [fetchPostsStarted]: (state) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: true,
      error: null,
    }
  }),
  [fetchPostsFailed]: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      error: action.payload,
    }
  }),
  [fetchPostsFinished]: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error: null,
      entries: mergeEntries(
        state.posts.entries,
        action.payload.hits.filter(p => !p.parent_id).map(toPost),
      ),
      page: action.payload.page
    }
  })
}

const mergeEntries = (oldEntries, newEntries) => {
  const isPresent = entry => oldEntries.find(
    old => old.id === entry.id
  )
  const isAbsent = entry => !isPresent(entry)
  return [
    ...oldEntries,
    ...newEntries.filter(isAbsent),
  ]
}

const reducer = (state, action) => {
  return reactions[action.type]
  ? reactions[action.type](state, action)
  : state
}

const fetchUsers = {
  reducer,
  action,

}

export default fetchUsers

