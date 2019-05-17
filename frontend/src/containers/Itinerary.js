import React from 'react'
import City from '../components/City'

const Itinerary = (props) => (
  <div>
    <h2>{props.details.title}</h2>
    <ul>
      {Object.keys(props.schedule).map(d => (<li>{d}</li>))}
    </ul>
    <h4>{props.details.vital_info}</h4>
    {props.cities.map(c => <City {...c}/>)}

    <h4>{props.details.helpful_info}</h4>
    <h4>{props.details.notes}</h4>
  </div>
)

export default Itinerary
