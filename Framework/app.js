var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const { port } = require('./config')

var app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/dist'))
app.use(require('./controllers'))

app.listen(port, function() {
    console.log("Listening on port " + port + "...")
})