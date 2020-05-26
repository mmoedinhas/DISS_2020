function sendDataToServer(survey) {
    //send Ajax request to your web server.
    alert("The results are:" + JSON.stringify(survey.data));
}

var survey = new Survey.Model(surveyJSON);

survey.onAfterRenderQuestion.add(function(survey, { question, htmlElement }) {

    if (question.name == "deq") {
        // Get the header
        var header = htmlElement.getElementsByTagName("table")[0];
        htmlElement.classList.add("no-overflow")
        header.classList.add("sticky");
    }

})



$("#surveyContainer").Survey({
    model: survey,
    onComplete: sendDataToServer
});