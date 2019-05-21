import React from 'react'
import Attraction from './Attraction'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromItinerary: attraction_info => dispatch => {
    const newAttraction = {
      area_id: attraction_info.areaId,
      name: attraction_info.name,
      classification: attraction_info.classification,
      description: attraction_info.description
    }
    fetch(`http://localhost:3000/attractions/`, {
      method: "POST",
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
      this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        areaId: this.props.id,
        name: this.state.name,
        classification: this.state.classification,
        description: this.state.description,
        itineraryId: this.props.itinerary.details.id
      }
      this.props.addAttractionFromItinerary(payload)
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
