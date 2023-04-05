import React from 'react'
import SinglePerson from './SinglePerson'

const Persons = (props) => {
  const handleDelete = props.handleDelete
  return (
    <>
     {props.nameToShow.map(x => <SinglePerson  key={x.name}name={x.name} number={x.number} handleDelete={handleDelete} id={x.id}/>)}
    </>
  )
}

export default Persons