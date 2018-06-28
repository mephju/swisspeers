import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import fetchPost from './fetchPost'
import LoadingPage from '../../shared/LoadingPage'

const mapState = (state, props) => {

  // debugger
  return ({
    posts: state.posts,
    post: state.posts.entries.find(
      p => p.id === props.match.params.id
    ),
  })
}

const mapDispatch = (dispatch, props) => ({
  fetchPost() {
    dispatch(fetchPost.action(props.match.params.id))
  }
})

const withPost = (Wrappee) => {

  class WithPost extends Component {

    constructor(props) {
      super(props)

      if(!this.props.post) {
        this.props.fetchPost()
      }
    }

    render() {
      const {props: {posts, post}} = this

      console.log('post', this.props)

      if(posts.error) {
        return <pre>
          {JSON.stringify(posts.error, null, 2)}
        </pre>
      }

      const {name} = this.props.match.params

      if(posts.loading || !post) {
        return <LoadingPage title={`Loading post ${name} `} />
      }

      return <Wrappee
        {...this.props}
        post={post}
      />
    }

  }

  WithPost.propTypes = {
    posts: PropTypes.object.isRequired,
    post: PropTypes.object,
    fetchPost: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  }

  return connect(mapState, mapDispatch)(WithPost)
}

export default withPost