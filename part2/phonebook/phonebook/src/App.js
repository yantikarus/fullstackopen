import React from 'react'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {name:'Arto Hellas'}
  ])
  //Handle form input element
  const [newName, setNewName] =useState('')

  const addPerson =(event)=> {
    event.preventDefault()
    //check if a name exist in the array
    const exist = persons.find(x => x.name === newName)
    if (exist){
      alert(`${newName} is already added to phonebook`)
      setNewName(" ")
      return
    }
    else{
      const newPerson = {
        name : newName,
      }
      setPersons(persons.concat(newPerson))
      setNewName(" ")
    }
  }

  const handleInputChange = (event)=>{
    setNewName(event.target.value)
  }

  return (
     <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    
      <h2>Numbers</h2>
      <ul>
      {persons.map(x=> <li key={x.name}>{x.name}</li>)}
      </ul>
    </div>
  )
}

export default App
