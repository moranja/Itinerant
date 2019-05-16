import React from 'react'

const Attraction = (props) => (
  <React.Fragment>
    <li>{`${props.name} (${props.classification}): ${props.description}`}</li>
  </React.Fragment>
)

export default Attraction
