import React from 'react'
import SinglePerson from './SinglePerson'

const Persons = (props) => {
  return (
    <>
     {props.nameToShow.map(x=> <SinglePerson  key={x.name}name={x.name} number={x.number}/>)}
    </>
  )
}

export default Persons