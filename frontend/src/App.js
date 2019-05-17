import React from 'react'
import { connect } from 'react-redux'
import Itinerary from './containers/Itinerary'
import MyMapComponent from './components/MyMapComponent'

const mapStateToProps = (state) => ({
  itinerary: state.selected_itinerary
})

const mapDispatchToProps = {
  loadItinerary: (id) => {
    return dispatch => {
      fetch("http://localhost:3000/attractions") // change this to request from the selected itinerary eventually....
      .then(res => res.json())
      .then(itinerary => {
        dispatch({ type: "LOAD_SELECTED_ITINERARY", payload: itinerary })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class App extends React.Component {

    state = {
    }

    componentDidMount() {
      this.props.loadItinerary()
    }

    render() {
      console.log(this.props.itinerary)
      return (
        <div>
          <h1>ITINERANT</h1>
          {!!Object.keys(this.props.itinerary).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
          ? (
            <div style={{display: "flex"}}>
              <div style={{flex: "1"}}>
                <MyMapComponent isMarkerShown={false} />
              </div>
              <div style={{flex: "1"}}>
                <Itinerary {...this.props.itinerary} />
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

// export default App;
