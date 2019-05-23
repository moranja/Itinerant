import React from 'react'
import { connect } from 'react-redux'
import Itinerary from '../components/Itinerary'
import MyMapComponent from '../components/MyMapComponent'
import history from '../history'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addAttractionFromMap: attraction_info => dispatch => {
    console.log(attraction_info)
    const newAttraction = {
      area_id: attraction_info.areaId,
      name: attraction_info.name,
      place_id: attraction_info.place_id,
      address: attraction_info.formatted_address,
      hours: attraction_info.opening_hours.weekday_text.join(' |'),
      cost: attraction_info.price_level,
      classification: attraction_info.types[0],
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
      areaId: ""
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
        : null
      )
      this.setState({
        [e.target.id]: parseInt(e.target.value),
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

    render() {
      console.log(this.props.itinerary)
      return (
        <div>
          {!!Object.keys(this.props.itinerary).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ?
            this.state.cityId === ""
            ?
              this.setState({
                cityId: this.props.itinerary.cities[0].id,
                areaId: !!this.props.itinerary.cities[0].areas.length ? this.props.itinerary.cities[0].areas[0].id : ""
              })
            :
            (
            <div>

            <div>
              {this.canEdit()}
            </div>
              <div style={{display: "flex"}}>
                <div style={{flex: "1"}}>
                  <MyMapComponent isMarkerShown={false} addAnAttraction={this.addAnAttraction}/>
                  <form onSubmit={this.handleSubmit}>
                    <select id="cityId" onChange={this.handleCityChange} >
                      {this.props.itinerary.cities.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
                    </select>
                    {
                      !this.state.cityId
                      ? this.setState({ cityId: this.props.itinerary.cities[0].id})
                      : (<select id="areaId" onChange={this.handleChange} >
                          {this.props.itinerary.cities.find(c => c.id === this.state.cityId).areas.map(a => (<option key={a.id} value={a.id}>{a.name}</option>))}
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
