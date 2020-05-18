const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { port, dbCon, dbName } = require('./config')
const mongoose = require('mongoose')

const dbUrl = dbCon + "/" + dbName

let app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public/dist'))
app.use(require('./controllers'))

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection

mongoose.connection.on("connected", (err, res) => {
    console.log('Database connected:', dbUrl)
})

db.on('error', err => {
    console.error('connection error:', err)
})

app.listen(port, function() {
    console.log("Listening on port " + port + "...")
})

exports.db = db