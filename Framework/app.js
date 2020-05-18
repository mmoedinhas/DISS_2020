const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { port } = require('./config')

let app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/dist'))
app.use(require('./controllers'))

app.listen(port, function() {
    console.log("Listening on port " + port + "...")
})