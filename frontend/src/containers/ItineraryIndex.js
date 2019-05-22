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

    componentDidMount() {
      this.props.loadItineraries()
    }

    render() {
      return (
        <ul>
          {this.props.itineraries.map((i,index) => <li key={index} onClick={() => history.push(`/itineraries/${i.id}`)}>{i.title}</li>)}
        </ul>
      )
    }
    // render() {
    //   return (
    //     <div>
    //       {!!Object.keys(this.props.itineraries).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
    //       ? (
    //         <ul>
    //           {this.props.itineraries.map((i,index) => <li key={index} onClick={() => history.push(`/itineraries/${i.id}`)}>{i.title}</li>)}
    //         </ul>
    //         )
    //       : (<h2>...</h2>)
    //       }
    //     </div>
    //   )
    // } Probably unnecessary...
  }
)
