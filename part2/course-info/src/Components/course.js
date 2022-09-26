const Accumulator = (props) => {
    const {course} = props
    
    const sum = course.parts.reduce((accumulator, currentValue) => accumulator += currentValue.exercises, 0)
      console.log("Success into Accumulator", course);
    
    return sum
    }
 
const Map = (part) => {
      console.log("Success into map");
      return(
      <div key={part.id}>
      <h2 key={part.id} >{part.name}</h2>
      {part.parts.map(obj => <p key={obj.id}>{obj.name}: {obj.exercises}</p>)}
      <p><b>Total of <Accumulator course={part}/> exercises.</b></p>
      </div>
      )
    }
    
const Course = ({course}) => { 
      return(
        <>
        <h1>Web Development Curriculum</h1>
        {course.map(Map, course.part)}
        </>
        )    
    } 

export default Course