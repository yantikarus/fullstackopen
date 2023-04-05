import React from 'react'

const SinglePerson = (props) => {
  const handleDelete = props.handleDelete

  return (
    <>
        <li>{props.name} {props.number}</li>
        <button onClick={()=>handleDelete(props.id, props.name)}>delete</button>
        
    </>
  )
}

export default SinglePerson