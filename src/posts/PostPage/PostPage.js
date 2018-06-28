import React, { Component } from 'react'
import withPost from './withPost'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Page from '../../shared/Page'
import Button from '../../shared/Button'


const Row = styled.div`
  display: flex;
`


const Content = styled.div`
  flex-grow: 1;
  padding: 0 20px;
`

class PostPage extends Component {

  render() {
    console.log('Post', this.props.post)

    const {post} = this.props

    return <Page>
    <h1> Post {post.id} </h1>
    <Row>

      <h2> {post.title} </h2>
      <Content>
        <h2> {post.author} </h2>
        <div> {post.points} </div>
        <div> {post.numComments} </div>
      </Content>

      <Button onClick={this.props.history.goBack}> Go to Post List </Button>

    </Row>
    <Row>
      <a href={post.url}> {post.url} </a>
    </Row>


  </Page>
  }
}

PostPage.propTypes = {
  post: PropTypes.object.isRequired,
}

export default withPost(PostPage)
