import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser, Location, Permissions } from 'expo';
import City from './City'
import path from '../components/path'

import { MonoText } from '../components/StyledText';

export default class NearestScreen extends React.Component {
  static navigationOptions = {
    title: "5 closest attractions",
  };

  state = {
    cities: [],
    searchTerm: "",
    filter: false
  }

  handleSearch = (e) => {
    console.log(e)
    if (e !== undefined) { // Checks for no search term
      this.setState({searchTerm: e})
    }
  }

  filterByDistance = () => {
    let itinerary = this.searchedItinerary()
    if (this.state.filter) {
      return itinerary
    } else {
      return itinerary
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location, filter: true });
    console.log(location)
    fetch(`http://${path}:3000/itineraries/${this.state.details.id}/nearest`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user_info.auth_token}`
      },
      body: JSON.stringify({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        amount: 5
      })
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then( user_res => {
      user_info = JSON.parse(user_res)
      AsyncStorage.getItem('itinerary').then( itinerary_res => {
        console.log(itinerary_res)
        fetch(`http://${path}:3000/itineraries/${itinerary_res}`, {
          headers:{
            "Authorization": `Bearer ${user_info.auth_token}`
          }
        })
        .then( res => res.json())
        .then( res => {
          if (res.error) {
            console.log(res.error)
            AsyncStorage.removeItem('user')
            .then(res => {
              this.props.navigation.navigate('Login')
            })
          } else {
            this.setState({
              cities: res.cities,
              details: res.details,
              schedule: res.schedule
            })
          }
        })
      })
    })
  }

  render() {
    let itinerary = this.filterByDistance()
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>
            <Button
              onPress={this._getLocationAsync}
              title="Learn More"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
            <TextInput
              style={styles.textInput}
              placeholder="Search Itinerary"
              value={this.state.searchTerm}
              onChangeText={this.handleSearch}
            />
          </View>
          <View style={styles.getStartedContainer}>
            {itinerary.cities.map( c => (
              <View key={c.id}>
                <City {...c}/>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
