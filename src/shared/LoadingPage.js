import React from 'react'
import Page from './Page'

const LoadingPageLock = Page.extend`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000000cc;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

const LoadingPage = props => {

  return <LoadingPageLock>

    <div className='spinner' >
      <div className='rect1' />
      <div className='rect2' />
      <div className='rect3' />
      <div className='rect4' />
      <div className='rect5' />
    </div>

  </LoadingPageLock>

}

export default LoadingPage