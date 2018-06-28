import fetchPosts from '../posts/PostListPage/fetchPosts'
import fetchPost from '../posts/PostPage/fetchPost'

export const initialState = {
  posts: {
    loading: false,
    error: null,
    entries: [],
    page: null
  }
}

const reducer = (state = initialState, action) => [
  fetchPosts,
  fetchPost,
].reduce((acc, fn) => fn.reducer(acc, action), state)


export default reducer