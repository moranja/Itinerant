import React from 'react'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'
import MyMapComponent from '../components/MyMapComponent'
import history from '../history'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromMap: attraction_info => dispatch => {
    console.log(attraction_info)
    const newAttraction = {
      area_id: attraction_info.areaId,
      name: attraction_info.name,
      latitude: attraction_info.geometry.location.lat(),
      longitude: attraction_info.geometry.location.lng(),
      place_id: attraction_info.place_id,
      address: attraction_info.formatted_address,
      // hours: attraction_info.opening_hours.weekday_text.join(' |'),
      cost: attraction_info.price_level,
      classification: attraction_info.classification,
      description: attraction_info.description
    }
    fetch(`http://localhost:3000/attractions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...newAttraction
      })
    })
    .then(res => res.json())
    .then(res => { dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})})
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
  },
  addCollaborator: payload => dispatch => {
    fetch(`http://localhost:3000/user_itineraries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...payload
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.message)
      } else {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})
      }
    })
  },
  copyItinerary: payload => dispatch => {
    console.log(payload)
    fetch(`http://localhost:3000/copyItinerary/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        id: payload
      })
    })
    .then(res => res.json())
    .then(res => {
      // console.log(res.details.id)
      // history.push(`/itineraries/${res.details.id}`)
      //
      // This doesn't work the way I'd expect, creates the new page and changes the path, but doesn't actually load it...
      //
      history.push(`/users/${localStorage.userId}`)
      // also breaking?
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class ItineraryContainer extends React.Component {

    state = {
      cityId: "",
      areaId: "",
      classification: "Food and Drink"
    }

    addAnAttraction = (place_info) => {
      this.setState({attraction: place_info[0]})
    }

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
    }

    handleCityChange = (e) => {
      let areaId = (
        !!this.props.itinerary.cities.find(c => c.id === parseInt(e.target.value)).areas.length
        ? this.props.itinerary.cities.find(c => c.id === parseInt(e.target.value)).areas[0].id
        : ""
      )
      console.log(e.target.id, e.target.value)
      this.setState({
        [e.target.id]: parseInt(e.target.value),
        areaId: areaId
      })
    } // had to make a custom changer so it would set the areaId when you switch cities to the first area in that city

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      console.log(this.state.attraction)
      let payload = {
        ...this.state.attraction,
        areaId: this.state.areaId,
        description: this.state.description,
        itineraryId: this.props.itinerary.details.id,
        classification: this.state.classification
      }
      this.props.addAttractionFromMap(payload)
    }

    handleAddUser = (e) => {
      e.persist()
      e.preventDefault()
      this.props.addCollaborator({
        username: this.state.username,
        itineraryId: this.props.itinerary.details.id
      })
    }

    componentDidMount() {
      this.props.loadItinerary(this.props.match.params.id)
    }

    canEdit = () => {
      if (!!this.props.itinerary.users.filter(u => u.id === parseInt(localStorage.userId)).length) {
        return (
          <div>
            <h4>Welcome {localStorage.username}, you may edit this page</h4>
            <form onSubmit={this.handleAddUser}>
              <label>Enter another user's username to add them as a collaborator: </label>
              <input type="text" placeholder="Enter Username" id="username" onChange={this.handleChange} />
              <input type="submit" />
            </form>
          </div>
        )
      } else {
        return (
          <div>
            <h4>You may not edit this page</h4>
            <button onClick={() => this.props.copyItinerary(this.props.itinerary.details.id)}>Click here to copy</button>
          </div>
        )
      }
    } // flesh this out

    static getDerivedStateFromProps(props, state) {
      if (!state.cityId && !state.areaId && !!Object.keys(props.itinerary).length) {  // if there's no city, area, and we have an itinerary...
        if (!!props.itinerary.cities.length) {                                        // and that itinerary has cities
          if (!!props.itinerary.cities[0].areas.length) {                             // and that city has areas
            return state={                                                            // cityId and areaId will be the first possible values
              cityId: props.itinerary.cities[0].id,
              areaId: props.itinerary.cities[0].areas[0].id
            }
          } else {                                                                    // if that city has no areas, areaId will be blank
            return state={
              cityId: props.itinerary.cities[0].id,
              areaId: ""
            }
          }
        } else {                                                                      // if that itinerary has no cities, both will be blank
          return state={
            cityId: "",
            areaId: ""
          }
        }
      } else {                                                                        // don't change state otherwise
        return state = {}
      }
    }

    renderForm() {
      if (this.props.itinerary.cities.length === 0) {
        return (
          <h3>Add a City and an Area to get started adding attractions from the map</h3>
        )
      } else {
        return (
          <form onSubmit={this.handleSubmit}>
            <select id="cityId" onChange={this.handleCityChange} >
              {this.props.itinerary.cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            {
              !!this.state.areaId
              ? (
                <select id="areaId" onChange={this.handleChange} >
                  {this.props.itinerary.cities.find(c => c.id === this.state.cityId).areas.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
                </select>
              )
              : null
            }
            <select id="classification" onChange={this.handleChange} >
              <option value="Food and Drink">Food and Drink</option>
              <option value="Attraction">Attraction</option>
              <option value="Shopping">Shopping</option>
              <option value="Nightlife">Nightlife</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <input type="text" placeholder="Description" id="description" onChange={this.handleChange} />
            <input type="submit"/>
          </form>
        )
      }
    }

    render() {
      return (
        <div>
          <CssBaseline />
          {!!Object.keys(this.props.itinerary).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ?
            (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                  <MyMapComponent isMarkerShown={false} addAnAttraction={this.addAnAttraction}/>
                  {this.renderForm()}
                  <br />
                  {this.canEdit()}
                </Grid>
                <Grid item xs={12} sm={7}>
                  <Itinerary {...this.props.itinerary} />
                </Grid>
              </Grid>
            </div>
            )
          : (<h2>loading...</h2>)
          }
        </div>
      )
    }
  }
)



  // <input type="text" placeholder="City" id="city" list="citiesList" onChange={this.handleChange}/>
  // <datalist id="citiesList">
  //   {this.props.itinerary.cities.map(c => (<option key={c.id} id={c.id} value={c.name}/>))}
  // </datalist>
