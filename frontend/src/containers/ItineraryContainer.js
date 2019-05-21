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
      area_id: attraction_info.areaId,
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

    state = {
    }

    componentDidMount() {
      this.setState({
        cityId: this.props.itinerary.cities,
        areaId: this.props.itinerary.cities
      })
    }

    addAnAttraction = (place_info) => {
      this.setState({attraction: place_info[0]})
    }

    handleChange = (e) => {
      this.setState({[`${e.target.id}`]: e.target.value})
    }

    handleCityChange = (e) => {
      let areaId = (
        !!this.props.itinerary.cities.find(c => c.id === parseInt(e.target.value)).areas.length
        ? this.props.itinerary.cities.find(c => c.id === parseInt(e.target.value)).areas[0].id
        : null
      )
      this.setState({
        [`${e.target.id}`]: parseInt(e.target.value),
        areaId: areaId
      })
    } // had to make a custom changer so it would set the areaId when you switch cities to the first area in that city

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        ...this.state.attraction,
        areaId: this.state.areaId,
        description: this.state.description,
        itineraryId: this.props.itinerary.details.id
      }
      this.props.addAttractionFromMap(payload)
    }

    render () {
      console.log(this.props)
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
                    <select id="cityId" onChange={this.handleCityChange} >
                      {this.props.itinerary.cities.map(c => (<option value={c.id}>{c.name}</option>))}
                    </select>
                    {
                      !this.state.cityId
                      ? this.setState({ cityId: this.props.itinerary.cities[0].id})
                      : (<select id="areaId" onChange={this.handleChange} >
                          {this.props.itinerary.cities.find(c => c.id === this.state.cityId).areas.map(a => (<option value={a.id}>{a.name}</option>))}
                        </select>)
                    }
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
