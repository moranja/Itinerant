import React from 'react';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { WebBrowser } from 'expo';

import { showLocation } from 'react-native-map-link'

export default class Attraction extends React.Component {


  openInMaps = (place_id) => {
    showLocation({
        latitude: 29.744950,
        longitude: -95.392837,
        title: 'Hay Merchant',  // optional
        googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        googlePlaceId: place_id,  // optionally specify the google-place-id
        appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
        app: 'google-maps'  // optionally specify specific app to use
    })
  }

  render() {
    return (
      <View >
        <Text>
          {`${this.props.name} (${this.props.classification}): ${this.props.description}`}
        </Text>
        <View>
        <TouchableOpacity
          onPress={() => this.openInMaps(this.place_id)}
        >
          <Text>Testing</Text>
          <Text>Testing</Text>
          <Text>Testing</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
