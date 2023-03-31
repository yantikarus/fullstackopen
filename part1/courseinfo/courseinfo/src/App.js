
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

  return (
    <div>
    {props.parts.map(item =>{
      return <Part name={item.name} exercises={item.exercises} key={item.id}/>
    })}
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
const Course = ({courses}) => {
  return (
    <div>
      <Header course ={courses}/>
      <Content parts={courses.parts}/>
      <Total parts={courses.parts}/>  
    </div>
  )
}


const App = () => {
  const courses = [
    {
    id:1,
    name: "Half Stack application development",
    parts: [
  {
      name: "Fundamentals of React",
      exercises:10,
      id:1
  },
  {
    name: "Using props to pass data",
    exercises:7,
    id:2
  },
 {
    name: "State of a component",
    exercises:14,
    id:3
  },
  {
    name: "Redux",
    exercises:11,
    id:4
  }
]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]
  return (
    <div>
      {courses.map(course=> {
        return <Course courses={course} key={course.id}/>
      } )}
    </div>
  );
}

export default App;
