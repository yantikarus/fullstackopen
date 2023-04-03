import React from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  //Handle form input element
  const [newName, setNewName] =useState('')
  const [newNumbers, setNewNumbers] =useState(0)
  const [search, setSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)

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
        number: newNumbers
      }
      setPersons(persons.concat(newPerson))
      setNewName(" ")
      setNewNumbers(0)
    }
  }

  const handleInputChange = (event)=>{
    setNewName(event.target.value)
  }

  const handleNewNumber= (event)=>{
    setNewNumbers(event.target.value)
  }
  const handleFilterInput = (event) =>{
    setSearch(event.target.value)
    setShowFiltered(true)

  }
  const nameToShow = showFiltered ? persons.filter(x =>  x.name.toLowerCase().includes(search)) : persons


  return (
     <div>
      <h2>Phonebook</h2>
        <Filter handleChange={handleFilterInput}/>
        <h3>add a new</h3>
        <PersonForm name={newName} submitHandler={addPerson} handleNameChange={handleInputChange} numbers={newNumbers} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ul>
      <Persons nameToShow={nameToShow}/>
      </ul>
    </div>
  )
}

export default App
