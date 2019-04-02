const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    })
})

app.get('/actor', db.getActors)
app.get('/actor/:id', db.getActorById)
app.post('/actor', db.createActor)
app.put('/update_actor/:id', db.updateActor)
app.delete('/actor/:id', db.deleteActor)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})