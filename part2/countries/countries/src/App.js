import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const SingleLanguage = ({info})=>{
  console.log(info)
  return(
    <li>{info}</li>
  )
}

const SingleCountry = (props)=>{
  console.log(props)
  return(
    <li>{props.name}</li>
  )
}



const CountryInfo =({info})=>{
  const country = info[0]
  const languages= country.languages

  return(
    <div>
      <h1>{country.name["common"]}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(x=><SingleLanguage info={x} key={x}/>)}
      </ul>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const handleInput =(event)=>{
    setSearch(event.target.value)
  }
  useEffect(()=>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response =>{
      setCountries(response.data)
      console.log(response.data)
    })
    },[])

  const nameToShow =countries.filter(x =>  x.name["common"].toLowerCase().includes(search))

  let answer = "Too many matches, specify another filter"

  return (
    <div>
      <p>find countries</p>
      <input value={search} onChange={handleInput}/>
      {/* <p>{nameToShow.length >10 ? answer: nameToShow.map(x=> x.name["common"])} </p> */}
      <p>{nameToShow.length >10 ? answer: nameToShow.map(x =><SingleCountry name={x.name["common"]} key={x.name["common"]}/>
  
        )} </p>
      <div>{nameToShow.length ===1 ? <CountryInfo info={nameToShow}/>: null} </div>
      </div>
  )
}

export default App