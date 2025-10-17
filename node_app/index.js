const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})


const generateId = () => (notes.length > 0 ? Math.max(...notes.map(note => Number(note.id))) : 0) + 1

app.post('/api/notes', (request, response) => {

  if (!request.body.content) {
    return response.status(400).json({error: 'content is missing'})
  }

  const note = {
    content: request.body.content,
    important: request.body.important || false,
    id: String(generateId())
  }
  console.log(note)

  notes = notes.concat(note)
  
  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})