import React from 'react'
import Itinerary from './containers/Itinerary'

class App extends React.Component {

  state = {
  }

  componentDidMount() {
    fetch("http://localhost:3000/attractions")
    .then(res => res.json())
    .then(res => this.setState({
      schedule: res.schedule,
      details: res.details,
      cities: res.cities
    }))
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <h1>Itinerant</h1>
        {!!Object.keys(this.state).length //Tests if this.state has any keys, if not the fetch hasn't completed yet
        ? (
          <Itinerary {...this.state} />
          )
        : (<h2>loading...</h2>)
        }
      </div>
    )
  }
}

export default App;
