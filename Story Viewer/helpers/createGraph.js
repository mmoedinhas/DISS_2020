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
            if (event['type'] == 'cutscene') {
                type = 'circle';
                color = palette[1];
                id = 'cutscene_';
            } else if (event['type'] == 'gameplay') {
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

module.exports = createGraph;