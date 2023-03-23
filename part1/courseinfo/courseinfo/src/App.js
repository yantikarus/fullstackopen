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
      {props.p} {props.e}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part p={props.p1} e={props.e1}/>
      <Part p={props.p2} e={props.e2}/>
      <Part p={props.p3} e={props.e3}/>
    </div>
  )
}
const Total = (props) => {
  const total = props.a + props.b+ props.c
  return (
    <div>
          <p>Number of exercises {total}
      </p>
    </div>
  )
}



const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercise1 = 10
  const part2 = "Using props to pass data"
  const exercise2 = 7
  const part3 = "State of a component"
  const exercise3 = 14


  return (
    <div>
      <Header course ={course}/>
      <Content p1={part1} e1={exercise1} p2={part2} e2={exercise2} p3={part3} e3={exercise3}/>
      <Total a={exercise1}b={exercise2}c={exercise3}/>
    </div>
  );
}

export default App;
