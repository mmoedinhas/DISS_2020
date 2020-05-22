function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(survey.data));
}

var survey = new Survey.Model(surveyJSON);

var nextBtnDisableHandler = function(survey) {
    if (survey.currentPage.name.includes("play_session")) {
        survey.currentPage.navigationButtonsVisibility = "hide";
    }
};

survey.onAfterRenderPage.add(nextBtnDisableHandler);

$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});