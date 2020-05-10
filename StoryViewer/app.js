var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const { port } = require('./config')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname + '/../db/');

var app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'))
app.use(require('./controllers'))

if (!fs.existsSync(dbPath)) {
    console.log("created db folder")
    fs.mkdirSync(dbPath)
}

app.listen(port, function() {
    console.log("Listening on port " + port + "...")
})