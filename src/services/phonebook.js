import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log("In getAll component");
    const request = axios.get(baseUrl)
    return request.then(response => response.data)    
}

const create = newObject => {
    console.log("In create component");
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
  }

const remove = id => {
    console.log("In delete component", id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
const update = ({person}) => {
    console.log('in update person',person)
    const updatedPerson = {...person, number: "08e"}
    const request = axios.put(`${baseUrl}/${person.id}`, updatedPerson)
    return request.then(response => response.data)

}
export default {getAll, create, remove,update}