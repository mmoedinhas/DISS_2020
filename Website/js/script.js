function calculatePlayerData(deq) {
    const deqValues = {
        "anger": "anger",
        "wanting": "desire",
        "dread": "anxiety",
        "sad": "sadness",
        "easygoing": "relaxation",
        "grossed_out": "disgust",
        "happy": "happiness",
        "terror": "fear",
        "rage": "anger",
        "grief": "sadness",
        "nausea": "disgust",
        "anxiety": "anxiety",
        "chilled_out": "relaxation",
        "desire": "desire",
        "nervous": "anxiety",
        "lonely": "sadness",
        "scared": "fear",
        "mad": "anger",
        "satisfaction": "happiness",
        "sickened": "disgust",
        "empty": "sadness",
        "craving": "desire",
        "panic": "fear",
        "longing": "desire",
        "calm": "relaxation",
        "fear": "fear",
        "relaxation": "relaxation",
        "revulsion": "disgust",
        "worry": "anxiety",
        "enjoyment": "happiness",
        "pissed_of": "anger",
        "liking": "happiness"
    }

    const playerProfile = {
        "anger": 0,
        "disgust": 0,
        "fear": 0,
        "anxiety": 0,
        "sadness": 0,
        "desire": 0,
        "relaxation": 0,
        "happiness": 0
    }

    for (const key of Object.keys(deq)) {
        playerProfile[deqValues[key]] += parseInt(deq[key]);
    }

    return playerProfile;
}

function sendDataToServer(survey) {

    let data = {...survey.data };
    data.playerProfile = calculatePlayerData(survey.data.deq);

    console.log("The results are:" + JSON.stringify(data));

    $.ajax({

        url: './action_add_player.php',
        type: 'POST',
        data: data,
        contentType: json,

        error: function(err) {
            console.log(err);
        },

        success: function(result) {
            console.log(result);
        }
    });
}

var survey = new Survey.Model(surveyJSON);

survey.onAfterRenderQuestion.add(function(survey, { question, htmlElement }) {

    if (question.name == "deq" || question.name.includes("game_exp_core_module_") || question.name.includes("game_exp_post_game_module_")) {
        var header = htmlElement.getElementsByTagName("table")[0];
        htmlElement.classList.add("no-overflow")
        header.classList.add("sticky");
        survey.questionErrorLocation = "top";
    } else {
        survey.questionErrorLocation = "bottom";
    }

})

$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});