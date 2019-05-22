import React from 'react'
import ItineraryIndex from '../containers/ItineraryIndex'

const HomePage = (props) => (
  <React.Fragment>
    <ItineraryIndex history={props.history}/>
  </React.Fragment>
)

export default HomePage
