import React from 'react'
import City from './City'
import { connect } from 'react-redux'

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
    fetch(`http://localhost:3000/cities`, {
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
    .then(res => { dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: res})})
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (
  class Itinerary extends React.Component {

    state = {
      searchTerm: ""
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
    }

    handleSearch = (e) => {
      if (e !== undefined) { // Checks for no search term
        this.setState({searchTerm: e.target.value})
      }
    }

    searchedItinerary = () => {
      const searchTerm = this.state.searchTerm
      let searchedCities = this.props.itinerary.cities.map(c => {
        if (c.name.toLowerCase().includes(searchTerm)) {
          return c // If the city name matches, return the whole city
        } else {
          let city = {...c}
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
      return {...this.props.itinerary, cities: [...filteredCities]}
    }

    render() {
      let itinerary = this.searchedItinerary()
      return (
        <div>
          <form>
            <input type="text" placeholder="Search Itinerary" id="searchTerm" onChange={this.handleSearch} />
          </form>
          <h2>{itinerary.details.title}</h2>
          <ul>
            {Object.keys(itinerary.schedule).map((d,index) => (<li key={index}>{d}</li>))}
          </ul>
          <h4>{itinerary.details.vital_info}</h4>
          {itinerary.cities.map((c,index) => <City {...c} key={c.id}/>)}


          <form onSubmit={this.handleSubmit}>
            New City:
            <br />
            <input type="text" placeholder="Name" id="name" onChange={this.handleChange}/>
            <input type="text" placeholder="Country" id="country" onChange={this.handleChange}/>
            <input type="text" placeholder="Description" id="content" onChange={this.handleChange}/>
            <input type="submit" />
          </form>

          <h4>{itinerary.details.helpful_info}</h4>
          <h4>{itinerary.details.notes}</h4>
        </div>
      )
    }
  }
)
