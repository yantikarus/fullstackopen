import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  //Handle form input element
  const [newName, setNewName] =useState('')
  const [newNumbers, setNewNumbers] =useState(0)
  const [search, setSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)

  useEffect(()=>{
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
      setPersons(response.data)
    })
  }, [])

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
