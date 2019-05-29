import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import HomePage from './containers/HomePage'
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import Profile from './components/Profile'
import UserIndex from './containers/UserIndex'
import ItineraryContainer from './containers/ItineraryContainer'
import NavBar from './components/NavBar'
import UserContainer from './containers/UserContainer'
import history from './history'

const App = () => (
  <div style={{ backgroundColor: "#bcedad"}}>
  <Router history={history} style={{ backgroundColor: "#bcedad"}}>
    {/* Sends you to login page if you're not logged in */}
    {
      !localStorage.token
      ? history.push('/login')
      : null
    }
    <NavBar />
    <Switch>
      <Route path="/users/:id" component={UserContainer} />
      <Route path="/users" component={UserIndex} />
      <Route path="/profile" component={Profile} />
      <Route path="/itineraries/:id" component={ItineraryContainer} />
      <Route path="/login" component={Login} />
      <Route path="/create_user" component={CreateUser} />
      <Route path="/" component={HomePage} />
    </Switch>
  </Router>
  </div>
)

export default App

//
// {/* "Navbar" */}
// ITINERANT&nbsp;
// <Link to={'/'}>Home</Link>&nbsp;
// <Link to={'/users'}>Users</Link>&nbsp;
// <Link to={'/profile'}>Profile</Link>&nbsp;
// <Link to={'/login'}>Login</Link>&nbsp;
// {/* Routes */}
