import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import history from './history'

const App = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
)

export default App
