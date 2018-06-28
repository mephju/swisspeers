const config = {
  api: {
    posts: (page) => `https://hn.algolia.com/api/v1/search?page=${page}`,
    post: (id) => `http://hn.algolia.com/api/v1/items/${id}`
  }
}

export default config