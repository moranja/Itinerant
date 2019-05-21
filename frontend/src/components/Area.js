import React from 'react'
import Attraction from './Attraction'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromItinerary: attraction_info => dispatch => {
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
  class Area extends React.Component {

    handleChange = (e) => {
      this.setState({[`${e.target.id}`]: e.target.value})
    }

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        ...this.state.attraction,
        city: this.state.city,
        area: this.state.area,
        description: this.state.description,
        itineraryId: this.props.itinerary.details.id
      }
      this.props.addAttractionFromMap(payload)
    }

    render() {
      return (
        <React.Fragment>
          <h3>{this.props.name}</h3>
          <p>{this.props.content}</p>
          <ul>
            {this.props.attractions.map(a => <Attraction {...a} key={a.id}/>)}
          </ul>
          <form onSubmit={this.handleSubmit}>
            New Attraction:
            <br />
            <input type="text" placeholder="Name" id="name" onChange={this.handleChange}/>
            <input type="text" placeholder="Classification" id="classification" onChange={this.handleChange}/>
            <input type="text" placeholder="Description" id="description" onChange={this.handleChange}/>
            <input type="submit" />
          </form>
        </React.Fragment>
      )
    }
  }
)
