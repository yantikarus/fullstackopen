import { useState } from "react";

const Button=({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Statistic =(props)=> {
  const {good, neutral, bad, total, ave, positive} = props
  if (total === 0){
    console.log('no feedback')
    return (
      <div>
        <h1>statistic</h1>
        <p>no feedback given</p>
        </div>
    )
    
  } else {
  return (
    <div>
      <h1>statistic</h1>
      <table>
      <StatisticLine text ="good" value={good}/>
      <StatisticLine text ="neutral" value={neutral}/>
      <StatisticLine text ="bad" value={bad}/>
      <StatisticLine text ="all" value={total}/>
      <StatisticLine text ="average" value={ave}/>
      <StatisticLine text ="positive" value={positive}/>
      </table>
    </div>
  )
  }
}

const StatisticLine =({text, value})=> {
  return (
  <tbody>
    <tr>
     <td>{text}</td>
     <td>{value}</td> 
     </tr>   
  </tbody>
  )
}



const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  let calculate_average = (good + (bad * -1))/total
  let calculate_positive = (good /total) *100 + "%"

  const addGood = ()=>{
    setGood(good + 1)
    setTotal(total + 1)
    
  }
  
  const addNeutral = ()=>{
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const addBad = ()=>{
    setBad(bad + 1)
    setTotal(total + 1)
  }
 
  return(
    <>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text='good'/>
      <Button handleClick={addNeutral} text='neutral'/>
      <Button handleClick={addBad} text='bad'/>
      <Statistic good={good} bad={bad} neutral={neutral} total={total} ave={calculate_average} positive={calculate_positive}/>
    </>
  )

}
export default App;
