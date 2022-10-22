const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    console.log("In get request")
    response.send('<h2>Thats a server baby</h2>')
})

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})

app.get('/info', (request,response) => {
    return response.end(`Phonebook has info for ${phonebook.length} people \n`+ Date())
})

app.get('/api/person/:id', (request,response) => {
    const id = Number(request.params.id)
    console.log("param:", typeof id);
    const person = phonebook.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).json("Person not found")
    }
})

app.delete('/api/person/:id', (request,response) => {
    const id = Number(request.params.id)
    console.log(id);
    phonebook = phonebook.filter(p => p.id !== id)
    response.status(204).end()
})


/*app.use takes the JSON posted turns into JS Object and attaches bellow request */
app.use(express.json())
app.post('/api/person/', (request, response) => {
    const int = Math.floor(Math.random()*1000)
    const name = request.body.name
    const number = request.body.number
    const newPerson = {
        id: int,
        name: name,
        number: number
    }
    
    if (!name) {
      console.log("in true")
      return response.status(400).json({ 
        error: 'name missing' 
      })} else if (!number) {
        return response.status(400).json({
          error: 'number missing'
        })
      }
    if (checkDuplicate(name)) {
      console.log("Yes, this is a duplicate");
      return response.status(400).json({
        error: 'Name Taken'
      })
    }

    console.log("Post api",name, number, int);
    phonebook = phonebook.concat(newPerson)
    response.json(newPerson)
})

const checkDuplicate = name => {
    console.log("In duplicate",name);
    const filtered = phonebook.filter(p => p.name.toLowerCase() === name.toLowerCase())
    if (filtered.length !== 0) {
      return true
    }
}

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})