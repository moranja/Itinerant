import React from 'react'
import Plan from './Plan'
import Area from './Area'

const City = (props) => (
  <div>
    <h2>{props.name}, {props.country}</h2>
      <ul>
        {props.plans.map(p => <Plan {...p} key={p.id}/>)}
      </ul>
      <br />
      {props.areas.map(a => <Area {...a} key={a.id}/>)}
  </div>
)

export default City
