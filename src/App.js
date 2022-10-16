import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'
import {Form, Search, duplicate} from './components/Phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [search, setSearch] = useState('')
  const [name, setNewName] = useState('')
  const [number, setNumber] = useState()

  
  /* Use the effect hook to get data from db.json */
  useEffect(() => {
    console.log("Effect");
    phonebookService
    .getAll()
    .then(numbers => setPersons(numbers))
    },[])






/* Add back in check for duplicates */

const processName = (event) => {
  event.preventDefault()
  const name = event.target[0].value
  const number = event.target[0].value
  console.log("In process name component",name);
    const result =  duplicate(name, persons)
    console.log("boolean result:", result);
    result ? alert('Name Taken') : saveName(name, number)
}

const saveName = (name, number) => {
    const obj = { name, number } 
  phonebookService
  .create(obj)
  .then(response => {console.log(`Created - name: ${response}`)})
  .then(setPersons(obj))
  
}
const handleSearchChange = event => setSearch(event.target.value)

const Reload = () => {
  console.log("quit")
}
  
return(
    <div>
      <h2>Phonebook</h2>
      <Search handleChange={handleSearchChange} handleInput={search}/>
      <h2>Add New</h2>
      <Form submit={processName}/>            
     <h2>Numbers</h2>
     <Persons persons={persons} search={search} setPersons={setPersons} />
     
    </div>    
  )
}
const handleDelete = (filtered, persons) => {
  if (window.confirm(`Are you sure you want to delete ${filtered.name}`)) {
    console.log("delete", persons);
    phonebookService
    .remove(filtered.id)
    persons.map(person => person)
  }

}


const Persons = ({persons, search, setPersons}) => {
  console.log("In persons component", persons,search);
  return(
    persons.filter(n => n.name.toLowerCase().includes(search.toLowerCase())).map(
      filtered => <p key={filtered.id}>{filtered.name} - {filtered.number} <DeleteButton person={filtered.id} handler={() => handleDelete(filtered)} persons={persons} /> </p>)
  )

}
const DeleteButton = (props) => {
  return(
    <button onClick={props.handler(props.persons)}>Delete</button>
  )
}

export default App