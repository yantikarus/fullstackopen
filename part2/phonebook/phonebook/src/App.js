import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  //Handle form input element
  const [newName, setNewName] =useState('')
  const [newNumbers, setNewNumbers] =useState(0)
  const [search, setSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)

  useEffect(()=>{
    personService
    .getAll()
    .then(initialPerson =>{
      setPersons(initialPerson)
    })
  }, [])

  const addPerson =(event)=> {
    event.preventDefault()
    //check if a name exist in the array
    const exist = persons.find(x => x.name === newName)              
    if (exist){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          //update number
          const changeNumber = {...exist, number:newNumbers}
          personService
          .update(exist.id, changeNumber)
          .then(returnedPerson => {
            setPersons(persons.map(n => n.id !==exist.id ? n : returnedPerson))}
          )
        }
      setNewName(" ")
      setNewNumbers(0)
      return
    }
    else{
      const newPerson = {
        name : newName,
        number: newNumbers
      }
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        console.log(returnedPerson)
        setNewName(" ")
        setNewNumbers(0)
      })

      // setPersons(persons.concat(newPerson))
      // setNewName(" ")
      // setNewNumbers(0)
    }
  }

  const handleInputChange = (event)=>{
    const typedInput = event.target.value
    setNewName(typedInput.trim())
  }

  const handleNewNumber= (event)=>{
    setNewNumbers(event.target.value)
  }
  const handleFilterInput = (event) =>{
    setSearch(event.target.value)
    setShowFiltered(true)

  }
   const handleDelete = (id, name)=> {
    console.log("user wants to delete this id:", id)
    if(window.confirm(`Delete ${name}?`)){
      const updatePerson = persons.filter(x=> x.id !==id)
      personService
      .remove(id)
      .then(setPersons(updatePerson))
    }
    else(
      console.log("user exit")
    )
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
      <Persons nameToShow={nameToShow} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

export default App
