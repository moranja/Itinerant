import React from 'react'

class App extends React.Component {

  componentDidMount() {
    fetch("http://localhost:3000/attractions")
    .then(res => res.json())
    .then(res => console.log(res))
  }
  
  render() {
    return (
      <div>
        <h1>Itinerant</h1>
      </div>
    )
  }
}

export default App;
