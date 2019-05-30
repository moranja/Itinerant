import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Keyboard,
  AsyncStorage
} from 'react-native'

import path from '../components/path'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: "Login Screen",
  };

  state = {
    name: "",
    password: "",
    error: ""
  }

  handleNameChange = (username) => {
    this.setState({ username: username })
  }

  handlePasswordChange = (password) => {
    this.setState({ password: password })
  }

  handleSubmit = (e) => {
    console.log(this.state.username)
    fetch(`http://${path}:3000/login`, {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then( res => res.json())
    .then( res => {
      if (res.error) {
        console.log(res.error)
        AsyncStorage.removeItem('user')
        this.setState({ error: res.message })
      } else {
        AsyncStorage.setItem('user', JSON.stringify(res))
        this.props.navigation.navigate('Profile')
      }
    })
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View>
          <Text style={styles.welcomeText}>
            Welcome to Itinerant
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            autoCapitalize = 'none'
            maxLength={20}
            value={this.state.username}
            onChangeText={this.handleNameChange}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize = 'none'
            secureTextEntry={true}
            maxLength={20}
            value={this.state.password}
            onChangeText={this.handlePasswordChange}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={this.handleSubmit}
          >
            <Text style={styles.saveButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.errorMessageText}>
            {this.state.error}
          </Text>
        </View>
      </ScrollView>
    )
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
  inputContainer: {
    paddingTop: 15
  },
  errorMessageText: {
    marginTop: 50,
    marginBottom: 20,
    color: 'red',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 50,
    marginBottom: 20,
    color: '#393b3a',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#eae9e7',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    marginTop: 80,
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
