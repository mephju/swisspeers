const toPost = entry => ({
  id: `${entry.objectID || entry.id}`,
  title: entry.title,
  author: entry.author,
  url: entry.url,
  points: entry.points,
  createdAt: entry.created_at,
  numComments: entry.num_comments
})

export default toPost