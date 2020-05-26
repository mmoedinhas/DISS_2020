var widget = {
    name: "game",
    title: "Game",
    iconName: "",

    widgetIsLoaded: function() {
        return true;
    },

    isFit: function(question) {
        return question.getType() === 'game';
    },

    activatedByChanged: function(activatedBy) {
        Survey.JsonObject.metaData.addClass("game", [], null, "text");
    },

    isDefaultRender: false,
    htmlTemplate: '<div id="game"></div>',

    afterRender: function(question, el) {
        // TODO get stuff from survey.data
        console.log(survey.data);

        let playerProfile = {};

        if (survey.data.deq) {
            //TODO calculate player data here
        }

        survey.data.playerProfile = playerProfile;

        el.addEventListener('endGame', function() {
            console.log("ended game");
            question.value = Game.getLogs();
            survey.currentPage.navigationButtonsVisibility = "show";
        });

        Game.newGame({
            parent: "game",
            doneDomElem: el,
        });
    }
}
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");