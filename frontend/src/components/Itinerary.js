import React from 'react'
import City from './City'
import CreateCityModal from './CreateCityModal'
import EditItineraryTitleDescModal from './EditItineraryTitleDescModal'
import EditItineraryVitalModal from './EditItineraryVitalModal'
import EditItineraryHelpfulModal from './EditItineraryHelpfulModal'
import EditItineraryNotesModal from './EditItineraryNotesModal'
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import path from '../path'
import port from '../port'
import history from '../history'


const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  addCityFromItinerary: city_info => dispatch => {
    const newCity = {
      itinerary_id: city_info.itineraryId,
      name: city_info.name,
      country: city_info.country,
      content: city_info.content
    }
    fetch(`http://${path}${port}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...newCity
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
  editItinerary: itinerary_info => dispatch => {
    const editItinerary = {
      itinerary_id: itinerary_info.itineraryId,
      title: itinerary_info.title,
      description: itinerary_info.description,
      vital_info: itinerary_info.vitalInfo,
      helpful_info: itinerary_info.helpfulInfo,
      notes: itinerary_info.notes
    }
    fetch(`http://${path}${port}/itineraries/${itinerary_info.itineraryId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({
        ...editItinerary
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
  deleteItinerary: itineraryId => dispatch => {
    fetch(`http://${path}${port}/itineraries/${itineraryId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(res => res.json())
    .then(res => {
      if (res.error) {
        console.log(res.message)
      } else {
        dispatch({ type: "CLEAR_SELECTED_ITINERARY", payload: res})
        history.push('/home')
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class Itinerary extends React.Component {

    state = {
      searchTerm: "",
      name: "",
      country: "",
      content: "",
      editTitle: this.props.itinerary.details.title,
      editDescription: this.props.itinerary.details.description,
      editVitalInfo: this.props.itinerary.details.vital_info,
      editHelpfulInfo: this.props.itinerary.details.helpful_info,
      editNotes: this.props.itinerary.details.notes
    }

    handleChange = (e) => {
      this.setState({[e.target.id]: e.target.value})
    }

    handleSubmit = (e) => {
      e.persist()
      e.preventDefault()
      let payload = {
        itineraryId: this.props.itinerary.details.id,
        name: this.state.name,
        country: this.state.country,
        content: this.state.content
      }
      this.props.addCityFromItinerary(payload)
      this.setState({
        name: "",
        country: "",
        content: ""
      })
    }

    handleEditSubmit = () => {
      let payload = {
        itineraryId: this.props.itinerary.details.id,
        title: this.state.editTitle,
        description: this.state.editDescription,
        vitalInfo: this.state.editVitalInfo,
        helpfulInfo: this.state.editHelpfulInfo,
        notes: this.state.editNotes,
      }
      console.log(payload)
      this.props.editItinerary(payload)
    }

    handleDelete = () => {
      this.props.deleteItinerary(this.props.itinerary.details.id)
    }

    handleSearch = (e) => {
      if (e !== undefined) { // Checks for no search term
        this.setState({searchTerm: e.target.value})
      }
    }

    searchedItinerary = () => {
      const searchTerm = this.state.searchTerm.toLowerCase()
      if (searchTerm === "") {
        return this.props.itinerary
      } else {
        let searchedCities = this.props.itinerary.cities.map(c => {
          if (c.name.toLowerCase().includes(searchTerm)) {
            return {...c, plans: []} // If the city name matches, return the whole city
          } else {
            let city = {...c, plans: []}
            let searchedAreas = city.areas.map(a => {
              if (a.name.toLowerCase().includes(searchTerm)) {
                return a
              } else {
                let area = {...a}
                let searchedAttractions = area.attractions.map(at => {
                  if (
                    at.name.toLowerCase().includes(searchTerm)
                    || at.classification.toLowerCase().includes(searchTerm)
                    || at.description.toLowerCase().includes(searchTerm)
                  ) {
                    return at
                  } else {
                    return null
                  }
                })
                let filteredAttractions = searchedAttractions.filter(Boolean)
                if (filteredAttractions.length !== 0) {
                  return {...area, attractions: [...filteredAttractions]} // If we get any hits on attraction, return the city, area, and attraction
                } else {
                  return null
                }
              }
            })
            let filteredAreas = searchedAreas.filter(Boolean)
            if (filteredAreas.length !== 0) {
              return {...city, areas: [...filteredAreas]} // If we get any hits on area name, return the city and those areas
            } else {
              return null
            }
          }
        })
        let filteredCities = searchedCities.filter(Boolean)
        return {schedule: [], details: {id: this.props.itinerary.details.id, title: this.props.itinerary.details.title}, cities: [...filteredCities]}
      }
    }

    vitalInfo = () => {
      if (!!this.props.itinerary.users.filter(u => u.id === parseInt(localStorage.userId)).length) {
        return (
          <EditItineraryVitalModal
            editVitalInfo={this.state.editVitalInfo}
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditSubmit}
          />
        )
      }
    } // flesh this out

    render() {
      let itinerary = this.searchedItinerary()
      return (
        <div>
          <TextField
            autoFocus
            margin="none"
            id="searchTerm"
            label="Search your itinerary:"
            onChange={this.handleSearch}
          />
          <EditItineraryTitleDescModal
            editTitle={this.state.editTitle}
            editDescription={this.state.editDescription}
            editVitalInfo={this.state.editVitalInfo}
            editHelpfulInfo={this.state.editHelpfulInfo}
            editNotes={this.state.editNotes}
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditSubmit}
            handleDelete={this.handleDelete}
          />
          <ul>
            {itinerary.schedule.map((d,index) => (<li key={index}>{d}</li>))}
          </ul>
          {this.vitalInfo()}
          {itinerary.cities.map((c,index) => <City {...c} key={c.id}/>)}
          <CreateCityModal handleChange={this.handleChange} handleSubmit={this.handleSubmit} />

          <EditItineraryHelpfulModal
            editHelpfulInfo={this.state.editHelpfulInfo}
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditSubmit}
          />
          <EditItineraryNotesModal
            editNotes={this.state.editNotes}
            handleChange={this.handleChange}
            handleEditSubmit={this.handleEditSubmit}
          />
        </div>
      )
    }
  }
)
