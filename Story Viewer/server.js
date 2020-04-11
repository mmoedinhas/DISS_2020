var express = require('express');
var path = require('path');
const fs = require('fs');

var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/json/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/public/json/' + req.filename), 'utf8', (err, jsonString) => {
        if (err) {
            res.status(404).send('Not found');
            return;
        }
        res.send(jsonString);
    })
})

app.listen(3000);