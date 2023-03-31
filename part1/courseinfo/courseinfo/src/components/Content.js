import React from 'react'
import Part from "./Part"

const Content = (props) => {
  
    return (
      <div>
      {props.parts.map(item =>{
        return <Part name={item.name} exercises={item.exercises} key={item.id}/>
      })}
      </div>
    )
  }

export default Content