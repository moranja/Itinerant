import React from 'react';
import {
  Text,
  View
} from 'react-native';
import Area from './Area'
import { WebBrowser } from 'expo';

export default class City extends React.Component {

  render() {
    return (
      <View >
        <Text>
          {this.props.name}, {this.props.country}
        </Text>
        {this.props.areas.map( a => (
          <View>
            <Area {...a}/>
          </View>
        ))}
      </View>
    );
  }
}
