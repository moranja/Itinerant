import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  itineraries: state.itineraries
})

const mapDispatchToProps = {
  loadItineraries: () => {
    return dispatch => {
      fetch("http://localhost:3000/itineraries/", {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`
        }
      }) // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(itineraries => {
        dispatch({ type: "ITINERARY_LIST", payload: itineraries })
      })
    }
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(
  class ItineraryIndex extends React.Component {

    componentDidMount() {
      this.props.loadItineraries()
    }

    render() {
      return (
        <div>
          {!!Object.keys(this.props.itineraries).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ? (
            <ul>
              {this.props.itineraries.map((i,index) => <li key={index} onClick={() => this.props.loadItinerary(i.id)}>{i.title}</li>)}
            </ul>
            )
          : (<h2>...</h2>)
          }
        </div>
      ) // The form here should be a find or create style dropdown...
    }
  }
)

// export default App;
