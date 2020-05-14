const express = require('express');
const router = express.Router();
const path = require('path');
const ID = require('../helpers/createId');
const createStoryLine = require('../helpers/createStoryLine');
const fs = require('fs');

const dbPath = path.join(__dirname + '/../db/');

router.post('/', function(req, res) {

    if (!req.body.graph || !req.body.playerType) {
        res.status(500).json({ error: "Invalid graph or playerType" });
        return;
    }

    let id;
    if (!req.body.id) {
        id = ID.create();
    } else {
        id = req.body.id;
    }

    let filename = dbPath + ID.getFilename(id);
    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.log(filename + ' already exists');
                res.json({ id: id });
                return;
            }

            console.log(err);
            res.status(500).json({ error: "Error creating db file" });
            return;
        }

        let content = {
            graph: req.body.graph,
            playerType: req.body.playerType
        }

        fs.writeFile(filename, JSON.stringify(content), function(err) {
            if (err) {
                console.log(err);
                res.status(500).json({ error: "Error writing to db file" });
                return;
            }
            res.json({ id: id });
        });
    });
})

router.put('/:id', function(req, res) {
    if (!req.body.currEvent) {
        console.log("Couldn't find currEvent in put request")
        res.send();
        return;
    }

    let id = req.params.id;

    let filename = dbPath + ID.getFilename(id);
    fs.open(filename, 'r+', (err, fd) => {
        if (err) {
            console.log(err);
            res.send();
            return;
        }

        let content = JSON.parse(fs.readFileSync(filename, 'utf8'));

        content['currEvent'] = req.body.currEvent;

        fs.writeFile(filename, JSON.stringify(content), function(err) {
            if (err) {
                console.log(err);
            }
            res.send();
        });
    });
});

router.get('/:id', function(req, res) {

    let id = req.params.id;
    let filename = dbPath + ID.getFilename(id);
    fs.open(filename, 'r', (err, fd) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Couldn't fetch graph details" });
            return;
        }

        let content = JSON.parse(fs.readFileSync(filename, 'utf8'));

        if (content.graph.errors.length == 0) {
            content.graph.graph = createStoryLine(content.playerType, content.graph.graph, false);
        }

        res.json(content);
    });

});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../views/debug.html'));
});

module.exports = router