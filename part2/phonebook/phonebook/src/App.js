import React from 'react'
import { useState } from 'react'

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

  let displayNumber = persons.map(x=> <li key={x.name}>{x.name} {x.number}</li>)


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
    const search = event.target.value
    // const filtered = persons.filter(x => x.name.includes(search))
    // console.log("i am searching for", search)
    // console.log("result", filtered)
    displayNumber = persons.filter(x => x.name.includes(search))
    console.log(displayNumber)

  }


  return (
     <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input onChange={handleFilterInput}/>
      </div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange}/>
        </div>
        <div>
          number: <input value={newNumbers} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    
      <h2>Numbers</h2>
      <ul>
      {displayNumber}
      </ul>
    </div>
  )
}

export default App
