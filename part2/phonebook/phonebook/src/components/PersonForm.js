import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitHandler}>
        <div>
          name: <input value={props.name} onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input value={props.numbers} onChange={props.handleNewNumber} placeholder="___-___________"/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm