import React from 'react'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'
import MyMapComponent from '../components/MyMapComponent'
import NavBar from '../components/NavBar'
import history from '../history'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import path from '../path'
import port from '../port'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromMap: attraction_info => dispatch => {
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
    fetch(`http://${path}${port}/attractions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
        "X-Requested-With": "XMLHttpRequest"
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
      fetch(`http://${path}${port}/itineraries/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      }) // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(itinerary => {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: itinerary })
      })
    }
  },
  addCollaborator: payload => dispatch => {
    fetch(`http://${path}${port}/user_itineraries/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
        "X-Requested-With": "XMLHttpRequest"
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
    fetch(`http://${path}${port}/copyItinerary/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`,
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify({
        id: payload
      })
    })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: "CLEAR_SELECTED_ITINERARY" })
      history.push('/profile')
    })
  },
  clearItinerary: () => ({ type: "CLEAR_SELECTED_ITINERARY" })
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class ItineraryContainer extends React.Component {

    state = {
      cityId: "",
      areaId: "",
      classification: "Food and Drink",
      description: ""
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
      this.setState({
        [e.target.id]: parseInt(e.target.value),
        areaId: areaId
      })
    } // had to make a custom changer so it would set the areaId when you switch cities to the first area in that city

    handleSubmit = (e, areaId) => {
      e.persist()
      e.preventDefault()
      let payload = {
        ...this.state.attraction,
        areaId: areaId,
        description: this.state.description,
        itineraryId: this.props.itinerary.details.id,
        classification: this.state.classification
      }
      this.props.addAttractionFromMap(payload)
      this.setState({ description: "", classification: "Food and Drink"})
    }

    handleAddUser = (e) => {
      e.persist()
      e.preventDefault()
      this.props.addCollaborator({
        username: this.state.username,
        itineraryId: this.props.itinerary.details.id
      })
    }

    clearItinerary = () => {
      this.props.clearItinerary()
    }

    fetchCSV = () => {
      fetch(`http://${path}${port}/itineraries/${this.props.itinerary.details.id}/csv/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.token}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
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

    // static getDerivedStateFromProps(props, state) {
    //   console.log(props, state)
    //   if (!state.cityId && !state.areaId && !!Object.keys(props.itinerary).length) {  // if there's no city, area, and we have an itinerary...
    //     if (!!props.itinerary.cities.length) {                                        // and that itinerary has cities
    //       if (!!props.itinerary.cities[0].areas.length) {                             // and that city has areas
    //         return state={                                                            // cityId and areaId will be the first possible values
    //           cityId: props.itinerary.cities[0].id,
    //           areaId: props.itinerary.cities[0].areas[0].id
    //         }
    //       } else {                                                                    // if that city has no areas, areaId will be blank
    //         return state={
    //           cityId: props.itinerary.cities[0].id,
    //           areaId: ""
    //         }
    //       }
    //     } else {                                                                      // if that itinerary has no cities, both will be blank
    //       return state={
    //         cityId: "",
    //         areaId: ""
    //       }
    //     }
    //   } else {                                                                        // don't change state otherwise
    //     return state = {}
    //   }
    // }

    // I think this is obsolete

    renderForm(cityId, areaId) {
      if (this.props.itinerary.cities.length === 0) {
        return (
          <h3>Add a City and an Area to get started adding attractions from the map</h3>
        )
      } else {
        return (
          <form onSubmit={(e) => this.handleSubmit(e, areaId)}>
            <select id="cityId" onChange={this.handleCityChange} >
              {this.props.itinerary.cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
            {
              !!areaId
              ? (
                <select id="areaId" onChange={this.handleChange} >
                  {this.props.itinerary.cities.find(c => c.id === cityId).areas.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
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
            <input type="text" placeholder="Description" id="description" value={this.state.description} onChange={this.handleChange} />
            <input type="submit"/>
          </form>
        )
      }
    }

    render() {
      let cityId
      let areaId

      if (!!this.state.cityId) {
        cityId=this.state.cityId
        if (!this.state.areaId && !!this.props.itinerary.cities.find( c => c.id === cityId).areas.length) {
          areaId=this.props.itinerary.cities.find( c => c.id === cityId).areas[0].id
        } else {
          areaId=this.state.areaId
        }
      } else if (this.props.itinerary.cities) {
        if (!!this.props.itinerary.cities.length) {
          if (!!this.state.areaId) {
            cityId=this.props.itinerary.cities[0].id
            areaId=this.state.areaId
          }
          else if (!!this.props.itinerary.cities[0].areas.length) {
            cityId=this.props.itinerary.cities[0].id
            areaId=this.props.itinerary.cities[0].areas[0].id
          } else {
            cityId=this.props.itinerary.cities[0].id
          }
        }
      }


      return (
        <div>
          <NavBar clearItinerary={this.clearItinerary} />
          <CssBaseline />
          {!!Object.keys(this.props.itinerary).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ?
            (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={5} style={{position: "relative"}}>
                  <div style={{
                    backgroundColor: "#eae9e7",
                    padding: "20px",

                    position: "absolute",
                    top: "7%",
                    left: "7%",
                    width: "500px",

                    margin: "10px 0 0 10px",
                  }}>
                    <MyMapComponent isMarkerShown={false} addAnAttraction={this.addAnAttraction}/>
                    {this.renderForm(cityId, areaId)}
                    <br />
                    {this.canEdit()}
                    <button onClick={this.fetchCSV}>Test</button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <div style={{
                    backgroundColor: "#eae9e7",
                    height: "100vh",
                    padding: "20px",
                    overflow: "scroll"}}>
                    <Itinerary {...this.props.itinerary} />
                  </div>
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
