let express = require('express');
let router = express.Router();
let path = require('path');
let fs = require('fs');

let validateJson = require('../helpers/validateJson.js')

router.get('/validate/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err1, jsonString) => {
        if (err1) {
            res.send('Error: Narrative file not found');
            return;
        }

        fs.readFile(path.join(__dirname + '/../json/schema/overall_narrative_schema.json'), 'utf8', (err2, schemaString) => {
            if (err2) {
                res.status(404).send('Error: Schema file not found');
                return;
            }

            let data = JSON.parse(jsonString);
            let schema = JSON.parse(schemaString);
            let result = validateJson(data, schema);

            if(result === "valid") {
                res.send("Valid json");
            } else {
                res.json(result);
            }
        });
    })
})

router.get('/:filename', function (req, res) {

    fs.readFile(path.join(__dirname + '/../json/' + req.params.filename), 'utf8', (err1, jsonString) => {
        if (err1) {
            res.status(404).send('Narrative file not found');
            return;
        }

        let data = JSON.parse(jsonString);
        let graph = createGraph(data);
        
        res.json(graph);
    })
})

function createGraph(jsonObj) {

    const graph = {
        nodes: [],
        edges: []
    }

    const palette = [
        '#8ecce6',
        '#d5cdea',
        '#fae2ef',
        '#fcf8e9'
      ];

      for (scene of jsonObj['scenes']) {

        let x = 0.0;
        let y = 0.0;
        let id = 'scene_' + scene['name'];

        graph.nodes.push({
          id: id,
          label: scene['name'],
          type: 'square',
          x: x,
          y: y,
          size: 1,
          color: palette[0]
        })

        y += 0.1;

        for (event of scene['events']) {

          let type = 'cross';
          let color = palette[3];
          id = "";
          if(event['type'] == 'cutscene') {
            type = 'circle';
            color = palette[1];
            id = 'cutscene_';
          } else if(event['type'] == 'gameplay') {
            type = 'diamond';
            color = palette[2];
            id = 'gameplay_';
          }

          id += event['name'];

          graph.nodes.push({
            id: id,
            label: event['name'],
            type: type,
            x: x,
            y: y,
            size: 0.5,
            color: color
          })

          x += 0.1;
        }
      }

      return graph;
}


module.exports = router