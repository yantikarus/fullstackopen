import React from 'react'

const SinglePerson = (props) => {
  return (
        <li key={props.name}>{props.name} {props.number}</li>
  )
}

export default SinglePerson