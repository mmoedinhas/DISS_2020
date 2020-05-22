var surveyJSON = {
    "title": "Affective Narratives for Engagement in Digital Games",
    "pages": [{
            "name": "page1",
            "elements": [{
                "type": "html",
                "name": "introduction",
                "html": "<p>Hello! My name is Matilde and I'm  a college student, trying to obtain my master's degree in Informatics and Computer Engineering at Faculty of Engineering of Porto's University (FEUP). I would like to request your help for my dissertation project \"Affective Narratives for Engagement in Digital Games\". It consists on researching and creating a framework that helps build game narratives that take into account the player's feelings and emotions (in other words, \"affective profile\"). It's main objective is to help the creation of video game experiences that are more personal to the user and hopefully more enjoyable.</p><p>I apologize in advance to mobile users as <span style=\"font-weight:bold\">this experience is only available on PC.</span></p><p>You will start by answering two small questionnaires, which will acquire some personal details and your affective profile. Then, you will have two short play sessions of the game I developed, each followed by some questions about the game. In the end, there's a final questionnaire with some questions about the experience as a whole.</p><p>The whole experience should not take more than 30 mins. The questionnaires are completely anonymous and all the data gathered here will be exclusively used for academic purposes. </p><p>I really appreciate your help. Thank you!</p> "
            }],
            "readOnly": true,
            "navigationButtonsVisibility": "show"
        },
        {
            "name": "game",
            "elements": [{
                "type": "game"
            }],
            "readOnly": true,
            "navigationButtonsVisibility": "show"
        },
        // {
        //     "name": "personal_information",
        //     "elements": [{
        //             "type": "radiogroup",
        //             "name": "age",
        //             "title": "Age",
        //             "isRequired": true,
        //             "choices": [{
        //                     "value": "<18",
        //                     "text": "< 18"
        //                 },
        //                 {
        //                     "value": "18-30",
        //                     "text": "18-30"
        //                 },
        //                 {
        //                     "value": "31-50",
        //                     "text": "31-50"
        //                 },
        //                 {
        //                     "value": "51-65",
        //                     "text": "51-65"
        //                 },
        //                 {
        //                     "value": ">65",
        //                     "text": "> 65"
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "radiogroup",
        //             "name": "language",
        //             "title": "Is English your mother language?",
        //             "isRequired": true,
        //             "choices": [{
        //                     "value": "yes",
        //                     "text": "Yes"
        //                 },
        //                 {
        //                     "value": "no",
        //                     "text": "No"
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "radiogroup",
        //             "name": "play_games",
        //             "title": "Do you play video game regularly? (>= 6 hours a week)",
        //             "isRequired": true,
        //             "choices": [{
        //                     "value": "yes",
        //                     "text": "Yes"
        //                 },
        //                 {
        //                     "value": "no",
        //                     "text": "No"
        //                 }
        //             ]
        //         },
        //         {
        //             "type": "radiogroup",
        //             "name": "favorite_games",
        //             "visibleIf": "{play_games} = 'yes'",
        //             "title": "What is your favorite game genre?",
        //             "isRequired": true,
        //             "hasOther": true,
        //             "choices": [{
        //                     "value": "action",
        //                     "text": "Action games"
        //                 },
        //                 {
        //                     "value": "shooter",
        //                     "text": "Shooter games"
        //                 },
        //                 {
        //                     "value": "sports",
        //                     "text": "Sports games"
        //                 },
        //                 {
        //                     "value": "action_adventure",
        //                     "text": "Action Adventure games"
        //                 },
        //                 {
        //                     "value": "rpg",
        //                     "text": "Role Playing games"
        //                 },
        //                 {
        //                     "value": "adventure",
        //                     "text": "Adventure games"
        //                 },
        //                 {
        //                     "value": "racing",
        //                     "text": "Racing games"
        //                 },
        //                 {
        //                     "value": "fighting",
        //                     "text": "Fighting games"
        //                 },
        //                 {
        //                     "value": "strategy",
        //                     "text": "Strategy games"
        //                 },
        //                 {
        //                     "value": "simulator",
        //                     "text": "Simulator games"
        //                 }
        //             ],
        //             "otherText": "Other"
        //         },
        //         {
        //             "type": "rating",
        //             "name": "important_narrative",
        //             "visibleIf": "{play_games} = 'yes'",
        //             "title": "How important is the narrative in a game to you?",
        //             "isRequired": true,
        //             "minRateDescription": "Not important at all",
        //             "maxRateDescription": "Extremely important"
        //         }
        //     ],
        //     "title": "This module will gather some personal information."
        // },
        // {
        //     "name": "page2",
        //     "elements": [{
        //         "type": "matrix",
        //         "name": "question1",
        //         "title": "Discrete Emotions Questionnaire",
        //         "description": "As of now, to what extent did you experience/are experiencing these emotions?",
        //         "isRequired": true,
        //         "columns": [{
        //                 "value": "1",
        //                 "text": "Not at all"
        //             },
        //             {
        //                 "value": "2",
        //                 "text": "Slightly"
        //             },
        //             {
        //                 "value": "3",
        //                 "text": "Somewhat"
        //             },
        //             {
        //                 "value": "4",
        //                 "text": "Moderately"
        //             },
        //             {
        //                 "value": "5",
        //                 "text": "Quite a bit"
        //             },
        //             {
        //                 "value": "6",
        //                 "text": "Very much"
        //             },
        //             {
        //                 "value": "7",
        //                 "text": "An extreme amount"
        //             }
        //         ],
        //         "rows": [{
        //                 "value": "anger",
        //                 "text": "Anger"
        //             },
        //             {
        //                 "value": "wanting",
        //                 "text": "Wanting"
        //             },
        //             {
        //                 "value": "dread",
        //                 "text": "Dread"
        //             },
        //             {
        //                 "value": "sad",
        //                 "text": "Sad"
        //             },
        //             {
        //                 "value": "easygoing",
        //                 "text": "Easygoing"
        //             },
        //             {
        //                 "value": "grossed_out",
        //                 "text": "Grossed Out"
        //             },
        //             {
        //                 "value": "happy",
        //                 "text": "Happy"
        //             },
        //             {
        //                 "value": "terror",
        //                 "text": "Terror"
        //             },
        //             {
        //                 "value": "rage",
        //                 "text": "Rage"
        //             },
        //             {
        //                 "value": "grief",
        //                 "text": "Grief"
        //             },
        //             {
        //                 "value": "nausea",
        //                 "text": "Nausea"
        //             },
        //             {
        //                 "value": "anxiety",
        //                 "text": "Anxiety"
        //             },
        //             {
        //                 "value": "chilled_out",
        //                 "text": "Chilled out"
        //             },
        //             {
        //                 "value": "desire",
        //                 "text": "Desire"
        //             },
        //             {
        //                 "value": "nervous",
        //                 "text": "Nervous"
        //             },
        //             {
        //                 "value": "lonely",
        //                 "text": "Lonely"
        //             },
        //             {
        //                 "value": "scared",
        //                 "text": "Scared"
        //             },
        //             {
        //                 "value": "mad",
        //                 "text": "Mad"
        //             },
        //             {
        //                 "value": "satisfaction",
        //                 "text": "Satisfaction"
        //             },
        //             {
        //                 "value": "sickened",
        //                 "text": "Sickened"
        //             },
        //             {
        //                 "value": "empty",
        //                 "text": "Empty"
        //             },
        //             {
        //                 "value": "craving",
        //                 "text": "Craving"
        //             },
        //             {
        //                 "value": "panic",
        //                 "text": "Panic"
        //             },
        //             {
        //                 "value": "longing",
        //                 "text": "Longing"
        //             },
        //             {
        //                 "value": "calm",
        //                 "text": "Calm"
        //             },
        //             {
        //                 "value": "fear",
        //                 "text": "Fear"
        //             },
        //             {
        //                 "value": "relaxation",
        //                 "text": "Relaxation"
        //             },
        //             {
        //                 "value": "revulsion",
        //                 "text": "Revulsion"
        //             },
        //             {
        //                 "value": "worry",
        //                 "text": "Worry"
        //             },
        //             {
        //                 "value": "enjoyment",
        //                 "text": "Enjoyment"
        //             },
        //             {
        //                 "value": "pissed_of",
        //                 "text": "Pissed off"
        //             },
        //             {
        //                 "value": "liking",
        //                 "text": "Liking"
        //             }
        //         ]
        //     }],
        //     "title": "This module will ask you questions about your affective profile as of now"
        // }
    ],
    "showPrevButton": false,
    "showQuestionNumbers": "off",
    "questionErrorLocation": "bottom"
}