import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 

  
  /* Use the effect hook to get data from db.json */
  useEffect(() => {
    console.log("Effect");
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log(response);
      setPersons(response.data)
    })
  },[])
  
  
const [search, setSearch] = useState('')
const [name, setNewName] = useState('')
const [number, setNumber] = useState()

const checkDuplicate = (name) => {
  var boolean = null;
  console.log('Name is', name);
  const exists = persons.filter(person => 
    JSON.stringify(person.name) === JSON.stringify(name))
  exists.length > 0 ? boolean = true : boolean = false
  return boolean;
}

const ProcessName = (event) => {
    event.preventDefault()
    const result =  checkDuplicate(name)
    result ? alert('Name Taken') : SaveName(name)
}

const SaveName = () => {
    const obj = {
    name: name,
    number: number
  } 
  setPersons(persons.concat(obj))
}


const handleInputNameChange = (event) => {setNewName(event.target.value)}
const handleNumberChange = (event) => setNumber(event.target.value)
const handleSearchChange = (event) => setSearch(event.target.value)
  
return(
    <div>
      <h2>Phonebook</h2>
      <Input text={"Search"} handleChange={handleSearchChange} handleInput={search}/>
      <h2>Add New</h2>
      <Form handleNameChange={handleInputNameChange} returning={name}
            handleNumberChange={handleNumberChange} returningNumber={number}
            onClick={ProcessName} submitAction={ProcessName}
      />
     <h2>Numbers</h2>
     <Persons persons={persons} search={search} />
     
    </div>    
  )
}

const Persons = (props) => {
  return(
    props.persons.filter(n => n.name.toLowerCase().includes(props.search.toLowerCase())).map(
      filtered => <p key={filtered.id}>{filtered.name} - {filtered.number}</p>)
  )

}

const Input = (props) => {
  return(
    <>
        {props.text} : <input 
        onChange={props.handleChange}
        value={props.handleInput}
        />
    </>
  )
  }

const Form = (props) => {
return(
<>
<form onSubmit={props.submitAction}>
  <Input text={"Name"} handleChange={props.handleNameChange} handleInput={props.returning} /><br></br>
  <Input text={"Number"} handleChange={props.handleNumberChange} handleInput={props.returningNumber}/><br></br>
  <button type='submit' >Add</button> 
</form>
</>
)
}  

export default App