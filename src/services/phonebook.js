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
    console.log("In delete component")
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
  
export default {getAll, create, remove}