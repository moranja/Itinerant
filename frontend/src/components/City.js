import React from 'react'
import Plan from './Plan'
import Area from './Area'

const City = (props) => {
  console.log(props)
  return (
  <div>
    <h2>{props.name}, {props.country}, {props.key}</h2>
      <ul>
        {props.plans.map(p => <Plan {...p} />)}
      </ul>
      <br />
      {props.areas.map(a => <Area {...a} />)}
  </div>
)}

export default City
