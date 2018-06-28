import React from 'react'
import PostListItem from './PostListItem'
import { shallow } from 'enzyme'

const post = {
  id: 'aaabbb',
  title: 'testuser',
  url: 'https://github.com/mojombo',
  author: 'kolja',
  points: 3999,
  numComments: 300,
}

it('renders PostListItem with title', () => {
  const item = shallow(
    <PostListItem
      post={post}
      goToPost={(id) => id}
    />
  )

  expect(item.contains(post.title)).toEqual(true)

})