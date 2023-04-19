import React from 'react'
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  //Handle form input element
  const [newName, setNewName] =useState('')
  const [newNumbers, setNewNumbers] =useState('')
  const [search, setSearch] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)
  const [notificationMsg, setNotificationMsg] = useState('')
  const [colorClass, setColorClass] = useState('..')

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
            setPersons(persons.map(n => n.id !==exist.id ? n : returnedPerson))
            setNotificationMsg(`Updated ${returnedPerson.name}'s number`)
            setColorClass("showmessage")
            setTimeout(()=>{
              setNotificationMsg(null)
          }, 5000)
          }
          )

        }
      setNewName(" ")
      setNewNumbers(" ")
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
        setNotificationMsg(`Added ${returnedPerson.name}`)
        setColorClass("showmessage")
        setTimeout(()=>{
          setNotificationMsg(null)
        }, 5000)
        setNewName(" ")
        setNewNumbers(" ")
      })
      .catch(error=>{
        setNotificationMsg(error.response.data.error)
        console.log(error.response.data.error)
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
      .then(setPersons(updatePerson),
        setNotificationMsg(`Deleted ${name}`),
        setColorClass("showmessage"),
        setTimeout(()=>{
        setNotificationMsg(null)
      }, 5000)
      )
      .catch(error => {
        setNotificationMsg(`'${name} ' was already deleted from server`)
        setColorClass("showwarning")
        setTimeout(()=>{
          setNotificationMsg(null)
        }, 5000)
        setPersons(persons.filter(x=> x.id !==id))
      })
      
    }
    else(
      console.log("user exit")
    )
   }
  const nameToShow = showFiltered ? persons.filter(x =>  x.name.toLowerCase().includes(search)) : persons


  return (
     <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMsg} result={colorClass}/>
        <Filter handleChange={handleFilterInput}/>
        <h3>Add a new</h3>
        <PersonForm name={newName} submitHandler={addPerson} handleNameChange={handleInputChange} numbers={newNumbers} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ul>
      <Persons nameToShow={nameToShow} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

export default App
