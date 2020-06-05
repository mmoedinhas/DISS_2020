const DEBUG = true;

function calculatePlayerData(deq) {
	const deqValues = {
		anger: 'anger',
		wanting: 'desire',
		dread: 'anxiety',
		sad: 'sadness',
		easygoing: 'relaxation',
		grossed_out: 'disgust',
		happy: 'happiness',
		terror: 'fear',
		rage: 'anger',
		grief: 'sadness',
		nausea: 'disgust',
		anxiety: 'anxiety',
		chilled_out: 'relaxation',
		desire: 'desire',
		nervous: 'anxiety',
		lonely: 'sadness',
		scared: 'fear',
		mad: 'anger',
		satisfaction: 'happiness',
		sickened: 'disgust',
		empty: 'sadness',
		craving: 'desire',
		panic: 'fear',
		longing: 'desire',
		calm: 'relaxation',
		fear: 'fear',
		relaxation: 'relaxation',
		revulsion: 'disgust',
		worry: 'anxiety',
		enjoyment: 'happiness',
		pissed_of: 'anger',
		liking: 'happiness',
	};

	const playerProfile = {
		anger: 0,
		disgust: 0,
		fear: 0,
		anxiety: 0,
		sadness: 0,
		desire: 0,
		relaxation: 0,
		happiness: 0,
	};

	if (deq) {
		for (const key of Object.keys(deq)) {
			playerProfile[deqValues[key]] += parseInt(deq[key]);
		}
	}

	return playerProfile;
}

function sendDataToServer(survey) {
	let data = { ...survey.data };
	data.playerProfile = calculatePlayerData(survey.data.deq);

	data.defaultFirst = surveyJSON.pages
		.find((page) => page.name === 'play_session_1')
		.elements.find((element) => element.type === 'game').defaultValue;

	if (DEBUG) {
		console.log('The results are:' + JSON.stringify(data));
	}

	data.deq = JSON.stringify(data.deq);
	data.playerProfile = JSON.stringify(data.playerProfile);
	data.play_session_1_logs = JSON.stringify(data.play_session_1_logs);
	data.play_session_2_logs = JSON.stringify(data.play_session_2_logs);
	data.game_exp_core_module_1 = JSON.stringify(data.game_exp_core_module_1);
	data.game_exp_core_module_2 = JSON.stringify(data.game_exp_core_module_2);

	$.ajax({
		url: './action_add_player.php',
		type: 'POST',
		data: data,
		dataType: 'json',

		error: function (err) {
			if (DEBUG) {
				console.log(err);
			}
		},

		success: function (result) {
			if (DEBUG) {
				console.log(result);
			}
		},
	});
}

function setupPageSelector(survey) {
	var selector = document.getElementById('pageSelector');
	for (var i = 0; i < survey.visiblePages.length; i++) {
		var option = document.createElement('option');
		option.value = i;
		option.text = 'Page ' + (i + 1);
		selector.add(option);
	}
}

function startSurvey(isDefaultFirst) {
	let game1 = surveyJSON.pages
		.find((page) => page.name === 'play_session_1')
		.elements.find((element) => element.type === 'game');
	let game2 = surveyJSON.pages
		.find((page) => page.name === 'play_session_2')
		.elements.find((element) => element.type === 'game');

	if (isDefaultFirst) {
		if (DEBUG) {
			console.log('is default first');
		}
		game1.defaultValue = true;
		game2.defaultValue = false;
	} else {
		if (DEBUG) {
			console.log('is not default first');
		}
		game1.defaultValue = false;
		game2.defaultValue = true;
	}

	survey = new Survey.Model(surveyJSON);

	survey.onCurrentPageChanged.add(function (
		survey,
		{ oldCurrentPage, newCurrentPage, isNextPage, isPrevPage }
	) {
		if (newCurrentPage.name == 'deq_page') {
			survey.showPrevButton = true;
		} else {
			survey.showPrevButton = false;
		}

		if (oldCurrentPage.name.includes('play_session_')) {
			if (DEBUG) {
				console.log('ending game');
			}
			Game.endGame();
		}
	});

	survey.onAfterRenderHeader.add(function (survey, { htmlElement }) {
		htmlElement.querySelector('.sv_header__text > h5').style.display = 'none';
		let headerText = document.createElement('h4');
		headerText.classList.add('header_step');
		htmlElement.querySelector('.sv_header__text').appendChild(headerText);
	});

	survey.onAfterRenderPage.add(function (survey, { page, htmlElement }) {
		if (page.name == 'play_session_1') {
			document.querySelector('.header_step').innerHTML = 'Step 2';
		} else if (page.name == 'final_questions') {
			document.querySelector('.header_step').innerHTML = 'Step 3';
		}
	});

	survey.onStarted.add(function () {
		document.querySelector('.header_step').innerHTML = 'Step 1';
	});

	survey.onAfterRenderQuestion.add(function (
		survey,
		{ question, htmlElement }
	) {
		let surveyContainer = document.getElementById('surveyContainer');
		surveyContainer.classList.remove('game');

		if (
			question.name == 'deq' ||
			question.name.includes('game_exp_core_module_') ||
			question.name.includes('game_exp_post_game_module_')
		) {
			var header = htmlElement.getElementsByTagName('table')[0];
			htmlElement.classList.add('no-overflow');
			header.classList.add('sticky');
			survey.questionErrorLocation = 'top';
		} else {
			survey.questionErrorLocation = 'bottom';
		}

		if (question.name.includes('_logs')) {
			htmlElement.classList.add('game');
		}

		if (
			question.name.includes('play_session_') &&
			question.name.includes('_description')
		) {
			htmlElement.classList.add('game_desc');
		}
	});

	$('#surveyContainer').Survey({
		model: survey,
		onComplete: sendDataToServer,
	});

	if (DEBUG) {
		setupPageSelector(survey);
	}
}

var survey;

if (DEBUG) {
	let debugDiv = document.getElementById('debug');
	debugDiv.style.display = 'block';
	debugDiv.innerHTML = `<p>Go to page directly without validation:</p>
  <select id="pageSelector" onchange="survey.currentPageNo = this.value"></select>`;
}

$.ajax({
	url: './action_get_last_player.php',
	type: 'GET',

	error: function (err) {
		if (DEBUG) {
			console.log(err);
		}

		startSurvey(true);
	},

	success: function (result) {
		if (DEBUG) {
			console.log(result);
		}

		if (result) {
			try {
				result = JSON.parse(result);
			} catch (e) {
				if (DEBUG) {
					console.log(e);
				}

				startSurvey(true);
				return;
			}
		}

		if (result.code == 200) {
			startSurvey(result.isDefault);
		} else {
			startSurvey(true);
		}
	},
});
