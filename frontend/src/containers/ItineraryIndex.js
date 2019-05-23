import React from 'react'
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
          <ul>
            {this.props.itineraries.map((i,index) => <li key={index} onClick={() => history.push(`/itineraries/${i.id}`)}>{i.title}</li>)}
          </ul>
          <form>
            <label>Title:&nbsp;</label>
            <input onChange={this.handleChange} name="title" type="text" />
            <input type="submit" onClick={this.handleSubmit} />
          </form>
        </React.Fragment>
      )
    }
  }
)
