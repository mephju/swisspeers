import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import fetchPosts from './fetchPosts'
import LoadingPage from '../../shared/LoadingPage'

const mapState = (state) => ({
  posts: state.posts,
})

const mapDispatch = (dispatch) => ({
  fetchPosts(url) {
    dispatch(fetchPosts.action(url))
  },
})

const mergeProps = (mappedState, mappedDispatchers, props) => ({
  ...props,
  ...mappedState,
  ...mappedDispatchers,
  fetchMorePosts() {
    mappedDispatchers.fetchPosts(mappedState.posts.page + 1)
  }
})

const withUsers = (Wrappee) => {

  class WithPosts extends Component {

    componentDidMount() {

      const fetchNeeded = !this.props.posts.entries.length
      if(fetchNeeded) {
        this.props.fetchPosts()
      }
    }

    render() {
      const {props: {posts}} = this
      const {loading, error} = posts


      if(error) {
        return <pre>
          {JSON.stringify(posts.error, null, 2)}
        </pre>
      }



      return <Fragment>

        {loading && <LoadingPage title='Loading posts...' /> }

        <Wrappee
          {...this.props}
          links={posts.links}
          posts={posts.entries}

        />
      </Fragment>
    }

  }

  WithPosts.propTypes = {
    posts: PropTypes.object.isRequired,
    fetchPosts: PropTypes.func.isRequired,
  }

  return connect(mapState, mapDispatch, mergeProps)(WithPosts)
}

export default withUsers