import React from 'react'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttraction: attraction_info => dispatch => {
    const newAttraction = {
      city: attraction_info.city,
      area: attraction_info.area,
      name: attraction_info.name,
      classification: attraction_info.types[0],
      description: attraction_info.description
    }
    fetch(`http://localhost:3000/itineraries/${attraction_info.itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...newAttraction
      })
    })
    .then(res => res.json())
    .then(res => { dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class ItineraryContainer extends React.Component {
    render () {
      return (
        <React.Fragment>
          <Itinerary {...this.props.itinerary} />
        </React.Fragment>
      )
    }
  }
)
