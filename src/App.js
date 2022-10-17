import { useState, useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/phonebook'
import {Form, Search, duplicate} from './components/Phonebook'
import './index.css'

const baseUrl = 'http://localhost:3001/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [search, setSearch] = useState('')
  const [name, setNewName] = useState('')
  const [number, setNumber] = useState()

  const[statusMessage, setStatusMessage] = useState(null)
  const[errorMessage, setErrorMessage] = useState(null)

  
  /* Use the effect hook to get data from db.json */
  useEffect(() => {
    console.log("Effect");
    phonebookService
    .getAll()
    .then(numbers => setPersons(numbers))
    },[])

const getId = name => {
  console.log("in get id",name);

}

const processName = (event) => {
  event.preventDefault()
  const name = event.target[0].value
  const newnumber = event.target[1].value
  console.log("In process name component",name);
    const result =  duplicate(name, persons)
    console.log("boolean result:", result);
    result ? updateNumber(name, newnumber) : saveName(name, newnumber)
}
 
const updateNumber = (name, newnumber) => {
  console.log("In name update component", name, newnumber)
  if (window.confirm(`Name ${name} exists. Replace number?`)) {
    const found = persons.find(person => person.name === name)
    console.log("Found Person", found, `${baseUrl}/${found.id}`)
    const updatedPerson = {...found, number: newnumber}
    const request = axios.put(`${baseUrl}/${found.id}`, updatedPerson)
    request.then(response => {
      setStatusMessage(`${name} succesfuly updated`)
      setTimeout(() => {setStatusMessage(null)
      }, 2000)
      setPersons(persons.map(p => p.id !== response.data.id ? p : response.data))
    })
    .catch(error => {
      console.log("IN error",error)
      setErrorMessage(`${name}, has already been removed from server.`)
      setTimeout(() => setErrorMessage(null), 2000)
    })
  }

}

const saveName = (name, number) => {
    const obj = { name, number } 
  phonebookService
  .create(obj)
  .then(response => {setStatusMessage(
    `Congrats, you succesfuly Added ${response.name} to phonebook`)
    setTimeout(() => {setStatusMessage(null)
    }, 2000)
    setPersons(persons.concat(response))
})
  
}
const handleSearchChange = event => setSearch(event.target.value)

const handleDelete = (id) => {
  console.log('in handleDelete', persons, id)
  phonebookService
  .remove(id)
  .then(response => {
    setStatusMessage(`Successfully deleted ${response.name} from phonebook`)
    setTimeout(() => {setStatusMessage(null)}, 3000)
    setPersons(persons.filter(p => p.id !== id))
    console.log("persons reset!");
  })
}

const handleUpdate = (id) => {
    console.log("In handle Update", id);
}
  
return(
    <div>
      <h2>Phonebook</h2>
      <StatusMessage message={statusMessage} errormessage={errorMessage}/><br/>
      <h2>Search</h2><br/>
      <Search handleChange={handleSearchChange} handleInput={search}/>
      <h2>Add New</h2>
      <Form submit={processName}/>            
     <h2>Numbers</h2>
     <ul>
     <Persons persons={persons} search={search} setPersons={setPersons} handleDelete={handleDelete} handleUpdate={handleUpdate} />
     </ul>
     
    </div>    
  )

  
}

const StatusMessage = ({message, errormessage}) => {
  if (message === null && errormessage === null) {
    return null
  } else if (errormessage) {
    return(<div className='error'>
      {errormessage}
    </div>
    )
  } else {
  return(<div className='success'>
    {message}
  </div>)
  }
} 

const Persons = ({persons, search, setPersons,handleDelete, handleUpdate}) => {
  console.log("In persons component", persons,search);
  if (search === null) {
    return(
      persons.map(person => <li key={person.id}>{person.name}</li> )
    )  
  }
  return(
    persons.filter(n => n.name.toLowerCase().includes(search.toLowerCase())).map(
      filtered => <li key={filtered.id}>{filtered.name} - {filtered.number} <button onClick={() => handleDelete(filtered.id)} >delete</button>
       </li>)
  )
}
const GetList = () => {}


export default App