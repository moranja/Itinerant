import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { WebBrowser } from 'expo';

import { showLocation } from 'react-native-map-link'

export default class Attraction extends React.Component {


  openInMaps = (place_id) => {
    showLocation({
        latitude: parseInt(this.props.latitude),
        longitude: parseInt(this.props.longitude),
        title: this.props.name,  // optional
        googleForceLatLon: false,  // optionally force GoogleMaps to use the latlon for the query instead of the title
        googlePlaceId: this.props.place_id,  // optionally specify the google-place-id
        appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
        app: 'google-maps'  // optionally specify specific app to use
    })
  }

  render() {
    return (
      <View style={styles.attractionView}>
        <TouchableOpacity
          onPress={() => this.openInMaps(this.place_id)}
          >
          <Text style={styles.attractionText}>
            {`${this.props.name} (${this.props.classification}): ${this.props.description}`}
          </Text>
        </TouchableOpacity>
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
  attractionText: {
    color: '#393b3a',
    marginLeft: 24,
    fontSize: 16,
    textAlign: 'left',
  },
  attractionView: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentContainer: {
    paddingTop: 30,
  }
});
