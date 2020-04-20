function getSchemaPath(jsonType) {

    let path = "";

    switch(jsonType) {
        case "overall_narrative":
            path = "overall_narrative_schema.json";
            break;
        case "cutscene":
            path = "cutscene_schema.json";
            break;
    }

    return path;
}

module.exports = getSchemaPath;