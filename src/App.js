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
  const number = event.target[1].value
  console.log("In process name component",name);
    const results = duplicate(name, persons)
    console.log("boolean resulst:", results[0].id);
    if (results !== null ) {
      if (window.confirm(`Do want to replace ${name} ?`)) {
        replace(results[0], number)
      }
    } {
      saveName(name,number)
    }

}

const replace = (person, number) => {
  console.log("in replace", person);
  
  phonebookService
  .put(person, number)
  .then(response => console.log("Replaced", response))
}

const duplicate = (name, persons) => {
  const results = persons.filter(n => 
    n.name.toLowerCase().includes(name.toLowerCase()))
  console.log(results);
  if (results !== null){
    console.log("NAME TAKEN")
    return results
  } else {return null}

}

const saveName = (name, number) => {
    const obj = {name,number} 
  phonebookService
  .create(obj)
  .then(response => {console.log(`Created - name: ${response}`)})
  .then(setPersons(persons.concat(obj)))
}
const handleDelete = (filtered) => {
  if (window.confirm(`Are you sure you want to delete ${filtered.name}`)) {
    console.log("delete", persons);
    phonebookService
    .remove(filtered.id)
    .then(setPersons(persons.filter(person => person.id !== filtered.id)))
  }

}
const handleSearchChange = event => setSearch(event.target.value)
 
return(
    <div>
      <h2>Phonebook</h2>
      <Search handleChange={handleSearchChange} handleInput={search}/>
      <h2>Add New</h2>
      <Form submit={processName}/>            
     <h2>Numbers</h2>
     <ul>
     {search ? persons.filter(n => n.name.toLowerCase().includes(search.toLowerCase())).map(
      filtered => <li key={filtered.id}>{filtered.name} - {filtered.number} 
      <button onClick={() => handleDelete(filtered)}>Delete</button> </li>)
      :
      persons.map(person => <li key={person.id}>{person.name} - {person.number} 
        <button onClick={() => handleDelete(person)}>Delete</button> </li>)

      }
     </ul>
     
     
    </div>    
  )
}
export default App