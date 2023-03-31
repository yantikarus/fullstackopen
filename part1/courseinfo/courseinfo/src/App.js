
const Header = ({course}) => {
  return (
    <div>
    <h1>{course.name}</h1>
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
  const [first, second, third, fourth] = props.parts

  return (
    <div>
    {/* {props.parts.map(item =>{
      return <Part name={item.name} exercises={item.exercises}/>
    })} */}
      <Part name={first.name} exercises={first.exercises}/>
      <Part name={second.name} exercises={second.exercises}/>
      <Part name={third.name} exercises={third.exercises}/>
      <Part name={fourth.name} exercises={fourth.exercises}/>
    </div>
  )
}
const Total = ({parts}) => {
  const total = parts.reduce((sum, item) => {
    return sum + item.exercises},0)
  return (
    <div>
      
          <h3>Total of {total} exercises</h3>
    </div>
  )
}
const Course = ({course}) => {
  return (
    <div>
      <Header course ={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>  
    </div>
  )
}


const App = () => {
  const course = {
    id:1,
    name: "Half Stack application development",
    parts: [
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
  },
  {
    name: "Redux",
    exercises:11
  }
]
  }
  return (
    <div>
      <Course course={course}/>
    </div>
  );
}

export default App;
