import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAALXKRDZu3lDYTuMUMxXWCqq3CRm5dZrU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
      {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
)

export default MyMapComponent

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
