import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY


const SingleLanguage = ({ info }) => {
  return (
    <li>{info}</li>
  )
}

const SingleCountry = ({ info, name, handleClick }) => {
  return (
    <>
      <li>{name}<button onClick={() => handleClick(info)}>show</button></li>

    </>
  )
}



const CountryInfo = ({ info }) => {
  const country = info
  const languages = country.languages
  const capital = country.capital
  const units = "metric"
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=${units}&appid=${api_key}`)
      .then(response => {
        setWeather(response.data) 
      })
  }, [])


  return (
    <div>
      <h1>{country.name["common"]}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(languages).map(x => <SingleLanguage info={x} key={x} />)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather &&
        <div>
          <div>Weather in {country.capital}</div>
          <div>Temperature {weather.main.temp} Celcius</div>
          <div><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather condition" /></div>
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      }
    </div>
  )
}




const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showButton, setShowButton] = useState("")

  const handleInput = (event) => {
    setSearch(event.target.value)
    if (event.target.value.length === 0) {
      setShowButton("")
    }

  }
  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const nameToShow = countries.filter(x => x.name["common"].toLowerCase().includes(search))
  let answer = "Too many matches, specify another filter"

  const handleClick = (info) => {
    setShowButton(info)
  }

  return (
    <div>
      <p>find countries</p>
      <input value={search} onChange={handleInput} />
      <div>{nameToShow.length > 10 ? answer : nameToShow.length === 1 ? <CountryInfo info={nameToShow[0]} /> : nameToShow.map(x => <SingleCountry info={x} name={x.name["common"]} key={x.name["common"]} handleClick={handleClick} />
      )} </div>
      <div>{showButton ? <CountryInfo info={showButton} /> : null}</div>
    </div>
  )
}

export default App