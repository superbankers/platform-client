import React from 'react'
import { Route, Switch } from 'react-router-dom' // react-router v4/v5
// import ReduxExample from './example/example'
// import Todo from './example/example-page-two'
import Home from './home'

/* eslint-disable */
const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
}

export default Main
