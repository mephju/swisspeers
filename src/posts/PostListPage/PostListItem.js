import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Li from '../../shared/Li'
import styled from 'styled-components'

const Cell = styled.div`
  flex-basis: 0;
  flex-grow: 1;
`

const DoubleCell = Cell.extend`
  flex-grow: 3;
`

const Title = styled.span`
  font-weight: bold;
`
class PostListItem extends Component {

  constructor(props) {
    super(props)

    this.goToPost = this.goToPost.bind(this)
  }

  goToPost() {
    this.props.goToPost(this.props.post.id)
  }

  render() {

    const {post} = this.props


    return <Li onClick={this.goToPost}>
      <DoubleCell>
        <Title>{post.title} </Title>
        <div> {post.author} </div>
      </DoubleCell>
      <Cell> {post.points} </Cell>

      <Cell>{post.numComments}</Cell>

    </Li>
  }
}

PostListItem.propTypes = {
  post: PropTypes.object.isRequired,
  goToPost: PropTypes.func.isRequired,
}

export default PostListItem
