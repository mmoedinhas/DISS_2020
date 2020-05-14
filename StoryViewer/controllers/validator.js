let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');
let multer = require('multer');

let validateJson = require('../helpers/validateJson.js');
let getSchemaPath = require('../helpers/getSchemaPath.js');

let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

router.post('/validate', upload.single('jsonFile'), function(req, res) {

    let filename = getSchemaPath(req.body.jsonType);

    if (filename === "") {
        res.status(500).send("Error: Invalid schema type");
        return;
    }

    if (!req.file || req.file.mimetype !== "application/json") {
        res.status(500).send("Error: Invalid json file");
        return;
    }

    fs.readFile(path.join(__dirname + '/../json/schema/' + filename), 'utf8', (err2, schemaString) => {
        if (err2) {
            res.status(404).send('Error: Schema file not found');
            return;
        }

        let data = JSON.parse(req.file.buffer.toString());
        let schema = JSON.parse(schemaString);
        let result = validateJson(data, schema);

        if (result === "valid") {
            res.send("Valid json");
        } else {
            res.json(result);
        }
    });
})

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/validator.html'));
})

module.exports = router