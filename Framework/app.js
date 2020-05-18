const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { port } = require('./config')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(require('./controllers'))

app.listen(port, function() {
    console.log("Listening on port " + port + "...")
})