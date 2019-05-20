import React from 'react'
import Attraction from './Attraction'

const Area = (props) => (
  <React.Fragment>
    <h3>{props.name}</h3>
    <p>{props.content}</p>
    <ul>
      {props.attractions.map(a => <Attraction {...a} key={a.id}/>)}
    </ul>
  </React.Fragment>
)

export default Area
