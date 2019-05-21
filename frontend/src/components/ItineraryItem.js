import React from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = {
  loadItinerary: (id) => {
    return dispatch => {
      fetch(`http://localhost:3000/itineraries/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      }) // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(itinerary => {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: itinerary })
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(
  class ItineraryItem extends React.Component {
    render() {
      return (
        <React.Fragment>
          <li onClick={() => this.props.loadItinerary(this.props.id)}>{this.props.title}</li>
        </React.Fragment>
      )
    }
  }
)
