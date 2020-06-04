// game session template {
//     "name": "play_session_1",
//     "elements": [{
//         "type": "game",
//         "name": "play_session_1_logs",
//         "title": "Play session 1",
//         "defaultValue": true
//     }],
//     "navigationButtonsVisibility": "hide"
// },

var surveyJSON = {
	title: 'Affective Narratives for Engagement in Digital Games',
	completedHtml: '<h3>Thank you for your help!</h3>',
	pages: [
		{
			name: 'introdution',
			elements: [
				{
					type: 'html',
					name: 'introduction',
					html: `<p>In this Master thesis project we are researching and creating a framework that helps build game narratives that take into account the player's feelings and emotions, using an affective profile.</p>
						<p>The main objective is to help the creation of video game experiences that are more personal to the user and hopefully more enjoyable.</p>
						<p>To test this framework, we have prepared a gameplay experiment running on a desktop web browser (<b>no support for mobile devices at the moment</b>) and we are asking for volunters to perform the experiment.</p>
						<p>This experiment should not take more than 30 mins. It is divided in 3 steps: </p>
						<ul>
						<li> Short questionnaire for gathering some general information, such as age range, gaming habits and affective profile. </li>
						<li> Playing two versions (in a random order) of a small game: one whose narrative is tailored to your affective profile and another with a default narrative. After each play session, your experience will be collected through a questionnaire. </li>
						<li> Final questions about the experience as a whole.
						</ul>
						<p>This questionnaire is completely anonymous and all the gathered data will be exclusively used for academic purposes. If any questions or problems arise please contact me via email at <b>up201504208@fe.up.pt</b>.</p>
						<p>Thank you for your help!</p>`,
				},
			],
			readOnly: true,
			navigationButtonsVisibility: 'show',
		},
		{
			name: 'personal_information',
			elements: [
				{
					type: 'radiogroup',
					name: 'age',
					title: 'Age',
					isRequired: true,
					choices: [
						{
							value: '<18',
							text: '< 18',
						},
						{
							value: '18-30',
							text: '18-30',
						},
						{
							value: '31-50',
							text: '31-50',
						},
						{
							value: '51-65',
							text: '51-65',
						},
						{
							value: '>65',
							text: '> 65',
						},
					],
				},
				{
					type: 'radiogroup',
					name: 'language',
					title: 'Is English your native language?',
					isRequired: true,
					choices: [
						{
							value: 'english',
							text: 'Yes',
						},
						{
							value: 'not_english',
							text: 'No',
						},
					],
				},
				{
					type: 'radiogroup',
					name: 'play_games',
					title: 'Do you play video games regularly? (>= 6 hours a week)',
					isRequired: true,
					choices: [
						{
							value: 'regularly',
							text: 'Yes',
						},
						{
							value: 'not_regularly',
							text: 'No',
						},
					],
				},
				{
					type: 'radiogroup',
					name: 'favorite_games',
					visibleIf: "{play_games} = 'regularly'",
					title: 'What is your favorite game genre?',
					isRequired: true,
					hasOther: true,
					choices: [
						{
							value: 'action',
							text: 'Action games',
						},
						{
							value: 'shooter',
							text: 'Shooter games',
						},
						{
							value: 'sports',
							text: 'Sports games',
						},
						{
							value: 'rpg',
							text: 'Role Playing games',
						},
						{
							value: 'adventure',
							text: 'Adventure games',
						},
						{
							value: 'platformer',
							text: 'Platformer games',
						},
						{
							value: 'puzzle',
							text: 'Puzzle games',
						},
						{
							value: 'racing',
							text: 'Racing games',
						},
						{
							value: 'fighting',
							text: 'Fighting games',
						},
						{
							value: 'strategy',
							text: 'Strategy games',
						},
						{
							value: 'simulaton',
							text: 'Simulaton games',
						},
					],
					otherText: 'Other',
				},
				{
					type: 'rating',
					name: 'important_narrative',
					visibleIf: "{play_games} = 'regularly'",
					title: 'How important is the narrative in a game to you?',
					isRequired: true,
					minRateDescription: 'Not important at all',
					maxRateDescription: 'Extremely important',
				},
			],
			title: 'This module will gather some general information.',
		},
		{
			name: 'deq_page',
			elements: [
				{
					type: 'matrix',
					name: 'deq',
					title: 'Discrete Emotions Questionnaire',
					description: `Take some time to think how you've been feeling the past week up until now and which emotions you experienced. 
            Then, with that in mind, read each word and rate them according to how strongly you felt or are still feeling that emotion. Please answer as honestly as possible.`,
					isRequired: true,
					columns: [
						{
							value: '1',
							text: 'Not at all',
						},
						{
							value: '2',
							text: 'Slightly',
						},
						{
							value: '3',
							text: 'Somewhat',
						},
						{
							value: '4',
							text: 'Moderately',
						},
						{
							value: '5',
							text: 'Quite a bit',
						},
						{
							value: '6',
							text: 'Very much',
						},
						{
							value: '7',
							text: 'An extreme amount',
						},
					],
					rows: [
						{
							value: 'anger',
							text: 'Anger',
						},
						{
							value: 'wanting',
							text: 'Wanting',
						},
						{
							value: 'dread',
							text: 'Dread',
						},
						{
							value: 'sad',
							text: 'Sad',
						},
						{
							value: 'easygoing',
							text: 'Easygoing',
						},
						{
							value: 'grossed_out',
							text: 'Grossed Out',
						},
						{
							value: 'happy',
							text: 'Happy',
						},
						{
							value: 'terror',
							text: 'Terror',
						},
						{
							value: 'rage',
							text: 'Rage',
						},
						{
							value: 'grief',
							text: 'Grief',
						},
						{
							value: 'nausea',
							text: 'Nausea',
						},
						{
							value: 'anxiety',
							text: 'Anxiety',
						},
						{
							value: 'chilled_out',
							text: 'Chilled out',
						},
						{
							value: 'desire',
							text: 'Desire',
						},
						{
							value: 'nervous',
							text: 'Nervous',
						},
						{
							value: 'lonely',
							text: 'Lonely',
						},
						{
							value: 'scared',
							text: 'Scared',
						},
						{
							value: 'mad',
							text: 'Mad',
						},
						{
							value: 'satisfaction',
							text: 'Satisfaction',
						},
						{
							value: 'sickened',
							text: 'Sickened',
						},
						{
							value: 'empty',
							text: 'Empty',
						},
						{
							value: 'craving',
							text: 'Craving',
						},
						{
							value: 'panic',
							text: 'Panic',
						},
						{
							value: 'longing',
							text: 'Longing',
						},
						{
							value: 'calm',
							text: 'Calm',
						},
						{
							value: 'fear',
							text: 'Fear',
						},
						{
							value: 'relaxation',
							text: 'Relaxation',
						},
						{
							value: 'revulsion',
							text: 'Revulsion',
						},
						{
							value: 'worry',
							text: 'Worry',
						},
						{
							value: 'enjoyment',
							text: 'Enjoyment',
						},
						{
							value: 'pissed_of',
							text: 'Pissed off',
						},
						{
							value: 'liking',
							text: 'Liking',
						},
					],
					isAllRowRequired: true,
				},
			],
			title:
				'The answers given in this module will be used to calculate your affective profile.',
		},
		{
			name: 'introduction_part2',
			elements: [
				{
					type: 'html',
					name: 'introduction_part2_panel',
					html: `<h1>You have completed part 1!</h1>
          <p>Thank you for completing the questionnaires.</p>
          <p></p>
          <p>The <b>NEXT</b> button will take you to part 2, where you will play two versions of the game with narratives generated by the framework.</p>
          `,
				},
			],
			readOnly: true,
			navigationButtonsVisibility: 'show',
		},
		{
			name: 'play_session_1',
			elements: [
				{
					type: 'panel',
					innerIndent: 1,
					name: 'panel_play_session_1_description',
					title: 'Game instructions',
					state: 'collapsed',
					elements: [
						{
							type: 'html',
							name: 'play_session_1_description',
							html: `<p>You are Clara, the daughter of a wealthy family. Today is Christmas and your parents are hosting a party with a lot of guests. As the eldest daughter of the family, it is expected that you attend the party and interact with the guests. How is Clara
                            going to handle this responsibility?</p>
    
                        <table class="game-controls">
                            <tr>
                                <th colspan="2">Game controls</th>
                            </tr>
                            <tr>
                                <td>Arrows</td>
                                <td>Walking</td>
                            </tr>
                            <tr>
                                <td>Z</td>
                                <td>
                                    <p>Interacting with characters whenever prompted</p>
                                    <p>Interacting with the dialogue box</p>
                                </td>
                            </tr>
                        </table>`,
						},
					],
				},
				{
					type: 'game',
					name: 'play_session_1_logs',
					title: ' ',
					defaultValue: true,
				},
			],
			navigationButtonsVisibility: 'hide',
		},
		{
			name: 'game_exp_1',
			elements: [
				{
					type: 'matrix',
					name: 'game_exp_core_module_1',
					title:
						'Please indicate how you felt WHILE playing the game for each of these items',
					isRequired: true,
					columns: [
						{
							value: '0',
							text: 'Not at all',
						},
						{
							value: '1',
							text: 'Slightly',
						},
						{
							value: '2',
							text: 'Moderately',
						},
						{
							value: '3',
							text: 'Fairly  ',
						},
						{
							value: '4',
							text: 'Extremely',
						},
					],
					rows: [
						{
							value: '1',
							text: 'I felt content',
						},
						{
							value: '3',
							text: "I was interested in the game's story",
						},
						{
							value: '4',
							text: 'I thought it was fun',
						},
						{
							value: '5',
							text: 'I was fully occupied with the game',
						},
						{
							value: '6',
							text: 'I felt happy',
						},
						{
							value: '7',
							text: 'It gave me a bad mood',
						},
						{
							value: '8',
							text: 'I thought about other things',
						},
						{
							value: '9',
							text: 'I found it tiresome',
						},
						{
							value: '12',
							text: 'It was aesthetically pleasing',
						},
						{
							value: '13',
							text: 'I forgot everything around me',
						},
						{
							value: '14',
							text: 'I felt good',
						},
						{
							value: '16',
							text: 'I felt bored',
						},
						{
							value: '18',
							text: 'I felt imaginative',
						},
						{
							value: '19',
							text: 'I felt that I could explore things',
						},
						{
							value: '20',
							text: 'I enjoyed it',
						},
						{
							value: '22',
							text: 'I felt annoyed',
						},
						{
							value: '24',
							text: 'I felt irritable',
						},
						{
							value: '25',
							text: 'I lost track of time',
						},
						{
							value: '27',
							text: 'I found it impressive',
						},
						{
							value: '28',
							text: 'I was deeply concentrated in the game',
						},
						{
							value: '29',
							text: 'I felt frustrated',
						},
						{
							value: '30',
							text: 'It felt like a rich experience',
						},
						{
							value: '31',
							text: 'I lost connection with the outside world',
						},
					],
					isAllRowRequired: true,
				},
				{
					type: 'comment',
					name: 'post_game_opinion_1',
					title: 'In your own words, how did you feel AFTER playing the game?',
				},
				{
					type: 'comment',
					name: 'open_answer_game_exp_1',
					title: 'What do you think the game reflected about you?',
				},
				{
					type: 'comment',
					name: 'main_character_opinion_1',
					title: 'What did you think of the main character?',
				},
			],
			title:
				'This module will ask you some questions about the game you just played.',
		},
		{
			name: 'introduction_part3',
			elements: [
				{
					type: 'html',
					name: 'introduction_part3_panel',
					html: `<h1>You have completed the first play session!</h1>
          <p>Thank you for for playing the game and completing the questionnaire.</p>
          <p></p>
          <p>The <b>NEXT</b> button will take you to the second play session.</p>
          `,
				},
			],
			readOnly: true,
			navigationButtonsVisibility: 'show',
		},
		{
			name: 'play_session_2',
			elements: [
				{
					type: 'panel',
					innerIndent: 1,
					name: 'panel_play_session_2_description',
					title: 'Game instructions',
					state: 'collapsed',
					elements: [
						{
							type: 'html',
							name: 'play_session_2_description',
							html: `<p>You are Clara, the daughter of a wealthy family. Today is Christmas and your parents are hosting a party with a lot of guests. As the eldest daughter of the family, it is expected that you attend the party and interact with the guests. How is Clara
                            going to handle this responsibility?</p>
    
                        <table class="game-controls">
                            <tr>
                                <th colspan="2">Game controls</th>
                            </tr>
                            <tr>
                                <td>Arrows</td>
                                <td>Walking</td>
                            </tr>
                            <tr>
                                <td>Z</td>
                                <td>
                                    <p>Interacting with characters whenever prompted</p>
                                    <p>Interacting with the dialogue box</p>
                                </td>
                            </tr>
                        </table>`,
						},
					],
				},
				{
					type: 'game',
					name: 'play_session_2_logs',
					title: ' ',
					defaultValue: false,
				},
			],
			navigationButtonsVisibility: 'hide',
		},
		{
			name: 'game_exp_2',
			elements: [
				{
					type: 'matrix',
					name: 'game_exp_core_module_2',
					title:
						'Please indicate how you felt WHILE playing the game for each of these items',
					isRequired: true,
					columns: [
						{
							value: '0',
							text: 'Not at all',
						},
						{
							value: '1',
							text: 'Slightly',
						},
						{
							value: '2',
							text: 'Moderately',
						},
						{
							value: '3',
							text: 'Fairly  ',
						},
						{
							value: '4',
							text: 'Extremely',
						},
					],
					rows: [
						{
							value: '1',
							text: 'I felt content',
						},
						{
							value: '3',
							text: "I was interested in the game's story",
						},
						{
							value: '4',
							text: 'I thought it was fun',
						},
						{
							value: '5',
							text: 'I was fully occupied with the game',
						},
						{
							value: '6',
							text: 'I felt happy',
						},
						{
							value: '7',
							text: 'It gave me a bad mood',
						},
						{
							value: '8',
							text: 'I thought about other things',
						},
						{
							value: '9',
							text: 'I found it tiresome',
						},
						{
							value: '12',
							text: 'It was aesthetically pleasing',
						},
						{
							value: '13',
							text: 'I forgot everything around me',
						},
						{
							value: '14',
							text: 'I felt good',
						},
						{
							value: '16',
							text: 'I felt bored',
						},
						{
							value: '18',
							text: 'I felt imaginative',
						},
						{
							value: '19',
							text: 'I felt that I could explore things',
						},
						{
							value: '20',
							text: 'I enjoyed it',
						},
						{
							value: '22',
							text: 'I felt annoyed',
						},
						{
							value: '24',
							text: 'I felt irritable',
						},
						{
							value: '25',
							text: 'I lost track of time',
						},
						{
							value: '27',
							text: 'I found it impressive',
						},
						{
							value: '28',
							text: 'I was deeply concentrated in the game',
						},
						{
							value: '29',
							text: 'I felt frustrated',
						},
						{
							value: '30',
							text: 'It felt like a rich experience',
						},
						{
							value: '31',
							text: 'I lost connection with the outside world',
						},
					],
					isAllRowRequired: true,
				},
				{
					type: 'comment',
					name: 'post_game_opinion_2',
					title: 'In your own words, how did you feel AFTER playing the game?',
				},
				{
					type: 'comment',
					name: 'open_answer_game_exp_2',
					title: 'What do you think the game reflected about you?',
				},
				{
					type: 'comment',
					name: 'main_character_opinion_2',
					title: 'What did you think of the main character?',
				},
			],
			title:
				'This module will ask you some questions about the game you just played.',
		},
		{
			name: 'introduction_part3',
			elements: [
				{
					type: 'html',
					name: 'introduction_part3_panel',
					html: `<h1>You have completed part 2!</h1>
          <p>Thank you for playing the two different versions of the game and completing the questionnaires.</p>
          <p></p>
          <p>The <b>NEXT</b> button will take you to the final part, which consists in some brief questions about this experience as a whole.</p>
          `,
				},
			],
			readOnly: true,
			navigationButtonsVisibility: 'show',
		},
		{
			name: 'final_questions',
			elements: [
				{
					type: 'radiogroup',
					name: 'version_liked_most',
					title: 'Which version of the game did you like the most?',
					isRequired: true,
					choices: [
						{
							value: '1',
							text: '1st version',
						},
						{
							value: '2',
							text: '2nd version',
						},
						{
							value: 'none',
							text: "I didn't like any of the versions",
						},
					],
				},
				{
					type: 'comment',
					name: 'open_answer_version_liked_most',
					title: 'Why?',
				},
				{
					type: 'radiogroup',
					name: 'version_reflected_most',
					title:
						'Which version of the game did you think reflected you or your emotions the most?',
					isRequired: true,
					choices: [
						{
							value: '1',
							text: '1st version',
						},
						{
							value: '2',
							text: '2nd version',
						},
						{
							value: 'none',
							text: 'None of the versions reflected me or my emotions',
						},
					],
				},
				{
					type: 'comment',
					name: 'open_answer_version_reflected_most',
					title: 'Why?',
				},
				{
					type: 'radiogroup',
					name: 'games_like_this_in_the_future',
					title: 'Would you like to play more games like this in the future?',
					isRequired: true,
					choices: [
						{
							value: 'yes',
							text: 'Yes',
						},
						{
							value: 'no',
							text: 'No',
						},
					],
				},
				{
					type: 'comment',
					name: 'open_answer_games_like_this_in_the_future',
					title: 'Why?',
				},
				{
					type: 'comment',
					name: 'suggestions',
					title:
						'If you have any suggestions or opinions regarding the questionnaires, the game or the experience as a whole, please write them here.',
				},
			],
			title:
				'This final module will ask some questions about the general experience.',
		},
	],
	showPrevButton: true,
	showQuestionNumbers: 'off',
	requiredText: '*',
	firstPageIsStarted: true,
	showProgressBar: 'bottom',
};
