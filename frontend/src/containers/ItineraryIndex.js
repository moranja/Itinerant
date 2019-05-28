import React from 'react'
import ItineraryTile from '../components/ItineraryTile'
import { connect } from 'react-redux'
import history from '../history'

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
      })
      .then(res => res.json())
      .then(itineraries => {
        dispatch({ type: "ITINERARY_LIST", payload: itineraries })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class ItineraryIndex extends React.Component {

    handleSubmit = (e) => {
      e.preventDefault()
      fetch('http://localhost:3000/itineraries/', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          title: this.state.title
        })
      })
      .then( res => res.json())
      .then( res => {
        this.props.history.push(`/itineraries/${res.details.id}`)
      })
    }

    handleChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    componentDidMount() {
      this.props.loadItineraries()
    }

    render() {
      return (
        <React.Fragment>
          <ItineraryTile itineraries={this.props.itineraries} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </React.Fragment>
      )
    }
  }
)
