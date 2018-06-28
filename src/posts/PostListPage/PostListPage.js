import React, { Component } from 'react'
import withPosts from './withPosts'
import PropTypes from 'prop-types'
import PostListItem from './PostListItem'
import styled from 'styled-components'
import Page from '../../shared/Page'
import Li from '../../shared/Li'
import Button from '../../shared/Button'

const MoreEntriesLi = Li.extend`
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 5px;
  cursor: auto;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`

class PostListPage extends Component {

  constructor(props) {
    super(props)

    this.goToPost = this.goToPost.bind(this)
  }

  goToPost(name) {
    this.props.history.push(`/posts/${name}`)
  }

  render() {

    console.log('PostListPage', this.props.posts)

    return <Page>
      <h1> HN Posts </h1>
      <Ul>
        {this.props.posts.map(post =>
          <PostListItem
            key={post.id}
            post={post}
            goToPost={this.goToPost}
          />
        )}

        <MoreEntriesLi>
          <Button onClick={this.props.fetchMorePosts}>
            Load more users
          </Button>
        </MoreEntriesLi>

      </Ul>
    </Page>
  }
}

PostListPage.propTypes = {
  posts: PropTypes.array.isRequired,
  fetchMorePosts: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default withPosts(PostListPage)
