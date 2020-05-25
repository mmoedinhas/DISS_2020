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

        el.addEventListener('endGame', function() {
            console.log("ended game");
            // TODO put game logs here
            // question.value = "hello";
            survey.currentPage.navigationButtonsVisibility = "show";
        });

        Game.newGame({
            parent: "game",
            doneDomElem: el,
        });
    }
}
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");