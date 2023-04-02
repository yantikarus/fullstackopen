import React from 'react'

const Total = ({parts}) => {
    const total = parts.reduce((sum, item) => {
      return sum + item.exercises},0)
    return (
      <div>
        
            <h3>Total of {total} exercises</h3>
      </div>
    )
  }

export default Total