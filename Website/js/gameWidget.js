var widget = {
	name: 'game',
	title: 'Game',
	iconName: '',

	widgetIsLoaded: function () {
		return true;
	},

	isFit: function (question) {
		return question.getType() === 'game';
	},

	activatedByChanged: function (activatedBy) {
		Survey.JsonObject.metaData.addClass('game', [], null, 'text');
	},

	isDefaultRender: false,
	htmlTemplate: '<div id="game"></div>',

	afterRender: function (question, el) {
		let playerProfile = {};

		if (survey.data.deq && !question.defaultValue) {
			playerProfile = calculatePlayerData(survey.data.deq);
		}

		let uuid = Game.newGame({
			parent: 'game',
			doneDomElem: el,
			playerProfile: playerProfile,
		});

		el.addEventListener('endGame', function () {
			question.value = {
				logs: Game.getLogs(),
				uuid: uuid,
			};
			survey.currentPage.navigationButtonsVisibility = 'show';
			var navigationButton = document.getElementsByClassName('sv_next_btn')[0];
			navigationButton.scrollIntoView({ behavior: 'smooth' });
		});
	},
};
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, 'customtype');
