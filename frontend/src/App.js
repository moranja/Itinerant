import React from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import UserIndex from './containers/UserIndex'
import ItineraryContainer from './containers/ItineraryContainer'
import history from './history'

const App = () => (
  <Router history={history}>
    {/* Sends you to login page if you're not logged in */}
    {
      !localStorage.token
      ? history.push('/login')
      : null
    }
    {/* "Navbar" */}
    ITINERANT&nbsp;
    <Link to={'/'}>Home</Link>&nbsp;
    <Link to={'/users'}>Users</Link>&nbsp;
    <Link to={'/login'}>Login</Link>&nbsp;
    {/* Routes */}
    <Switch>
      <Route path="/users" component={UserIndex} />
      <Route path="/itineraries/:id" component={ItineraryContainer} />
      <Route path="/login" component={Login} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
)

export default App
