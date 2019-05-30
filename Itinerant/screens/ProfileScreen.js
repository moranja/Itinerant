import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import path from '../components/path'

import { MonoText } from '../components/StyledText';

export default class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      backgroundColor: '#923c2d',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerTintColor: '#fff',
  };

  state = {
    itineraries: []
  }

  handleSubmit = (id) => {
    AsyncStorage.setItem('itinerary', `${id}`)
    this.props.navigation.navigate('Itinerary')
  }

  logOut = () => {
    AsyncStorage.removeItem('user')
    .then(res => {
      this.props.navigation.navigate('Login')
    })
  }


  componentDidMount() {
    AsyncStorage.getItem('user').then( res => {
      user_info = JSON.parse(res)
      fetch(`http://${path}:3000/users/${user_info.id}`, {
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
            username: res.username,
            itineraries: res.itinerary_list
          })
        }
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View>

            {this.state.itineraries.map( i => (
              <View style={styles.itineraryView} key={i.id}>
                <TouchableOpacity
                  onPress={() => this.handleSubmit(i.id)}
                >
                  <Text style={styles.itineraryText}>{i.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.logOut()}
          >
            <Text style={styles.saveButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    borderColor: '#923c2d',
    backgroundColor: '#923c2d',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#eae9e7',
  },
  itineraryText: {
    color: '#393b3a',
    marginLeft: 12,
    fontSize: 30,
    textAlign: 'left',
  },
  itineraryView: {
    marginTop: 15,
    marginBottom: 15,
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
