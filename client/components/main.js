import React from 'react'
import { Route, Switch } from 'react-router-dom' // react-router v4/v5
// import ReduxExample from './example/example'
// import Todo from './example/example-page-two'
import Home from './home'
import Video from './video'
import Login from './login'

/* eslint-disable */
const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/video" component={Video} />
      </Switch>
    </div>
  )
}

export default Main
