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
    }

    if (req.file.mimetype !== "application/json") {
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

// router.get('/:filename', function(req, res) {

//     fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err1, jsonString) => {
//         if (err1) {
//             res.status(404).send('Narrative file not found');
//             return;
//         }

//         let data = JSON.parse(jsonString);
//         let graph = createGraph(data);

//         res.json(graph);
//     })
// })

// router.post('/', function(req, res) {
//     let playerType = req.body.playerType;
//     let data = req.body.data;

//     fs.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8', (err2, schemaString) => {
//         if (err2) {
//             let error = {
//                 error: "Schema file not found."
//             };
//             res.send(error);
//             return;
//         }

//         let schema = JSON.parse(schemaString);
//         let result = validateJson(data, schema);

//         if (result === "valid") {
//             let graph = createGraph(data);

//             if (graph.errors.length != 0) {
//                 let error = {
//                     error: graph.errors
//                 }
//                 res.send(error);
//                 return;
//             }

//             let story = buildStory(playerType, graph.graph);

//             if (story.scenes.length == 0) {
//                 let error = {
//                     error: "Story has no scenes."
//                 }
//                 res.send(error);
//                 return;
//             }

//             let errors = [];
//             for (scene of story.scenes) {
//                 if (scene.events.length == 0) {
//                     errors.push("Scene " + scene.name + " has no events.");
//                 }
//             }

//             if (errors.length != 0) {
//                 let error = {
//                     error: errors
//                 }
//                 res.send(error);
//                 return;
//             }

//             res.send(story);

//         } else {
//             let error = {
//                 error: result
//             };
//             res.json(error);
//         }
//     });
// })

module.exports = router