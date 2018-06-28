import React, {Fragment} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom'
import PostListPage from './posts/PostListPage/PostListPage'
import PostPage from './posts/PostPage/PostPage'

const Routes = () => {

  return <Router>
    <Fragment>
      {window.location.pathname === '/' && <Redirect to='/posts' /> }
      <Route exact path='/posts' component={PostListPage} />
      <Route exact path='/posts/:id' component={PostPage} />
    </Fragment>
  </Router>
}

export default Routes