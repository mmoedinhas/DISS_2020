function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(survey.data));
}

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});