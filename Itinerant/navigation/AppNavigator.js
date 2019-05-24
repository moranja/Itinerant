import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

// import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ItineraryScreen from '../screens/ItineraryScreen'

const ProfileStack = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Profile: ProfileScreen,
  Itinerary: ItineraryScreen
  // ,
  // Main: MainTabNavigator,
})

export default createAppContainer(createSwitchNavigator(
  {
    Login: LoginScreen,
    Profile: ProfileStack,
    Home: HomeScreen
  },
  {
    initialRouteName: "Home"
  }
))
