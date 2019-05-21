import React from 'react'
import City from './City'

const Itinerary = (props) => {
  return (
  <div>
    <h2>{props.details.title}</h2>
    <ul>
      {Object.keys(props.schedule).map((d,index) => (<li key={index}>{d}</li>))}
    </ul>
    <h4>{props.details.vital_info}</h4>
    {props.cities.map((c,index) => <City {...c} key={c.id}/>)}

    <h4>{props.details.helpful_info}</h4>
    <h4>{props.details.notes}</h4>
  </div>
)}

export default Itinerary
