import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import Attraction from './Attraction'
import { WebBrowser } from 'expo';

export default class Area extends React.Component {

  render() {
    return (
      <View >
        <Text style={styles.areaText}>
          {this.props.name}: {this.props.content}
        </Text>
        {this.props.attractions.map( a => (
          <View key={a.id}>
            <Attraction {...a}/>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sortButton: {
    borderWidth: 1,
    borderColor: '#923c2d',
    backgroundColor: '#923c2d',
    padding: 15,
    margin: 5
  },
  sortButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  areaText: {
    color: '#393b3a',
    marginLeft: 18,
    fontSize: 18,
    textAlign: 'left',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
