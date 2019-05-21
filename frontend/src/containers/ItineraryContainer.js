import React from 'react'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'
import MyMapComponent from '../components/MyMapComponent'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromMap: attraction_info => dispatch => {
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

    componentDidMount() {
      // this.props.loadItinerary(4)
    }

    addAnAttraction = (place_info) => {
      this.setState({attraction: place_info[0]})
    }

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

    render () {
      return (
        <div>
          <h1>ITINERANT</h1>
          {!!Object.keys(this.props.itinerary).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ? (
            <div>
              <div style={{display: "flex"}}>
                <div style={{flex: "1"}}>
                  <MyMapComponent isMarkerShown={false} addAnAttraction={this.addAnAttraction}/>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="City" id="city" onChange={this.handleChange} />
                    <input type="text" placeholder="Area" id="area" onChange={this.handleChange} />
                    <br />
                    <input type="text" placeholder="Description" id="description" onChange={this.handleChange} />
                    <input type="submit"/>
                  </form>
                </div>
                <div style={{flex: "1"}}>
                  <Itinerary {...this.props.itinerary} />
                </div>
              </div>
            </div>
            )
          : (<h2>loading...</h2>)
          }
        </div>
      )
    }
  }
)
