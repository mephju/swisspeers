import toPost from '../toPost'
import config from '../../config'

export const fetchPostStarted = 'fetchPostStarted'
export const fetchPostFailed = 'fetchPostFailed'
export const fetchPostFinished = 'fetchPostFinished'

const start = id => ({ type: fetchPostStarted, payload: {id}})
const fail = payload => ({ type: fetchPostFailed, payload })
const finish = payload => ({ type: fetchPostFinished, payload})


const action = (id) => dispatch => {

  dispatch(start(id))

  fetch(`${config.api.post(id)}`)
  .then(res => res.json())
  .then(payload => dispatch(finish(payload)))
  .catch(error => dispatch(fail(error)))
}

const reactions = {
  [fetchPostStarted]: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: true,
      error: null,
    }
  }),
  [fetchPostFailed]: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      error: action.payload,
    }
  }),
  [fetchPostFinished]: (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      loading: false,
      error: null,
      entries: [toPost(action.payload)],
    }
  })
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

