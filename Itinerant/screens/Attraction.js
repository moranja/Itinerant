import React from 'react';
import {
  Text,
  View
} from 'react-native';
import { WebBrowser } from 'expo';

export default class Attraction extends React.Component {

  render() {
    return (
      <View >
        <Text>
          {`${this.props.name} (${this.props.classification}): ${this.props.description}`}
        </Text>
      </View>
    );
  }
}
