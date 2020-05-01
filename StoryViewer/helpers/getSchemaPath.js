function getSchemaPath(jsonType) {

    let path = "";

    switch (jsonType) {
        case "overall_narrative":
            path = "overall_narrative_schema.json";
            break;
        case "cutscene":
            path = "cutscene_schema.json";
            break;
        case "gameplay":
            path = "gameplay_schema.json";
            break;
        case "actors":
            path = "actors_schema.json";
            break;
        case "dialogue":
            path = "dialogue_schema.json";
            break;
    }

    return path;
}

module.exports = getSchemaPath;