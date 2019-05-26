import React from 'react'
// import { connect } from 'react-redux'

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");


const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAALXKRDZu3lDYTuMUMxXWCqq3CRm5dZrU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    // addAttraction: (places) => {console.log(places)}
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 41.9, lng: -87.624
        },
        markers: [], // **?????
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onCenterChanged: () => {
          this.setState({
            center: refs.map.getCenter()
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          this.props.addAnAttraction(places) // Add logic here to scrape the places object for the information I want

          // const bounds = new google.maps.LatLngBounds();

          // places.forEach(place => {
          //   if (place.geometry.viewport) {
          //     bounds.union(place.geometry.viewport)
          //   } else {
          //     bounds.extend(place.geometry.location)
          //   }
          // });
          console.log(places)
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            place_info: place
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
        markerWasClicked: (markers, marker) => {
          const placesWithoutSelected = markers.filter(m => m.place_info.place_id !== marker.place_info.place_id).map(m => m.place_info)
          const info = marker.place_info
          const places = [info, ...placesWithoutSelected]
          this.props.addAnAttraction(places)

          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
            place_info: place
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
          this.setState({
            center: nextCenter,
            markers: nextMarkers
          })
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    onCenterChanged={props.onCenterChanged} // lol this is why the map wouldn't drag
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={11}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customize your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginBottom: `20px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} onClick={() => props.markerWasClicked(props.markers, marker)}/>
    )}
  </GoogleMap>
);

export default MapWithASearchBox
























// THIS PUTS A MAP ON THE PAGE, NEED TO ADD A SEARCH BOX
// import React from 'react'
// import { compose, withProps } from "recompose"
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import SearchBox from "react-google-maps/lib/components/places/SearchBox"
//
// const MyMapComponent = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAALXKRDZu3lDYTuMUMxXWCqq3CRm5dZrU&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),
//   withScriptjs,
//   withGoogleMap
// )((props) =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//       {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//   </GoogleMap>
// )
//
// export default MyMapComponent

// <MyMapComponent isMarkerShown />// Map with a Marker
// <MyMapComponent isMarkerShown={false} />// Just only Map


// <SearchBox
//   ref={props.onSearchBoxMounted}
//   bounds={props.bounds}
//   controlPosition={google.maps.ControlPosition.TOP_LEFT}
//   onPlacesChanged={props.onPlacesChanged}
// >
//   <input
//     type="text"
//     placeholder="Customized your placeholder"
//     style={{
//       boxSizing: `border-box`,
//       border: `1px solid transparent`,
//       width: `240px`,
//       height: `32px`,
//       marginTop: `27px`,
//       padding: `0 12px`,
//       borderRadius: `3px`,
//       boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
//       fontSize: `14px`,
//       outline: `none`,
//       textOverflow: `ellipses`,
//     }}
//   />
// </SearchBox>
