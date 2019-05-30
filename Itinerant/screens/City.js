import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Area from './Area'
import { WebBrowser } from 'expo';

export default class City extends React.Component {

  render() {
    return (
      <View>
        <Text style={styles.cityText}>
          {this.props.name}, {this.props.country}
        </Text>
        {this.props.areas.map( a => (
          <View key={a.id}>
            <Area {...a}/>
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
  cityText: {
    color: '#393b3a',
    marginLeft: 12,
    fontSize: 18,
    textAlign: 'left',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
