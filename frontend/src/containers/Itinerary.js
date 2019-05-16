import React from 'react'
import City from '../components/City'

export default class Itinerary extends React.Component {

  render() {
    return (
      <div>
        <h2>{this.props.details.title}</h2>
        <ul>
          {Object.keys(this.props.schedule).map(d => (<li>{d}</li>))}
        </ul>
        <h4>{this.props.details.vital_info}</h4>
        {this.props.cities.map(c => <City {...c}/>)}

        <h4>{this.props.details.helpful_info}</h4>
        <h4>{this.props.details.notes}</h4>
      </div>
    )
  }
}
