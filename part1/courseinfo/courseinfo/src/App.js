const Header = (props) => {
  return (
    <div>
    <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
      {props.name} {props.exercises}
      </p>
    </div>
  )
}

const Content = (props) => {
  const [first, second, third] = props.parts

  return (
    <div>
      <Part name={first.name} exercises={first.exercises}/>
      <Part name={second.name} exercises={second.exercises}/>
      <Part name={third.name} exercises={third.exercises}/>
    </div>
  )
}
const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises+ props.parts[2].exercises
  return (
    <div>
          <p>Number of exercises {total}
      </p>
    </div>
  )
}



const App = () => {
  const course = "Half Stack application development"
  const parts = [
  {
      name: "Fundamentals of React",
      exercises:10
  },
  {
    name: "Using props to pass data",
    exercises:7
  },
 {
    name: "State of a component",
    exercises:14
  }
]

  return (
    <div>
      <Header course ={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
}

export default App;
