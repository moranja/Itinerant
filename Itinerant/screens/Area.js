import React from 'react';
import {
  Text,
  View
} from 'react-native';
import Attraction from './Attraction'
import { WebBrowser } from 'expo';

export default class Area extends React.Component {

  render() {
    return (
      <View >
        <Text>
          {this.props.name}: {this.props.content}
        </Text>
        {this.props.attractions.map( a => (
          <View>
            <Attraction {...a} key={a.id}/>
          </View>
        ))}
      </View>
    );
  }
}
