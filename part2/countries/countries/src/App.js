import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const SingleLanguage = ({info})=>{
  return(
    <li>{info}</li>
  )
}

const SingleCountry = ({info, name, handleClick})=>{
  return(
    <>
    <li>{name}<button onClick={()=>handleClick(info)}>show</button></li>
    
    </>
  )
}



const CountryInfo =({info})=>{
  const country = info
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
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showButton, setShowButton] = useState("")

  const handleInput =(event)=>{
    setSearch(event.target.value)
    if(event.target.value.length===0){
      setShowButton("")
    }
    
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

  const handleClick=(info)=>{
    setShowButton(info) 
  }

  return (
    <div>
      <p>find countries</p>
      <input value={search} onChange={handleInput}/>
      <div>{nameToShow.length >10 ? answer: nameToShow.length ===1 ? <CountryInfo info={nameToShow[0]}/>: nameToShow.map(x =><SingleCountry info={x}name={x.name["common"]} key={x.name["common"]} handleClick={handleClick}/>
        )} </div>
        <div>{showButton ? <CountryInfo info={showButton}/>: null}</div>
      </div>
  )
}

export default App