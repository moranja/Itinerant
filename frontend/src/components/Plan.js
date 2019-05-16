import React from 'react'

const Plan = (props) => (
  <React.Fragment>
    <li>{`${props.date}, ${props.time}: ${props.content}`}</li>
  </React.Fragment>
)

export default Plan
