DISS_2020
======

Repository for my dissertation project at FEUP 2020

`JSON files` folder
------
Contains the documentation (schema) and examples of the JSON files that are essential to the framework

`Framework` folder
------
Contains the framework code.

The framework is responsible for receiving the overall narrative file and user profile and returning an organized story to display to the user. Also validates other story files.

`StoryViewer` folder
------
Contains the code for the server that serves the Story Viewer and the JSON validator

### Story Viewer
Viewing tool for the story. When uploading a overall story file, it displays the story in a graph

### JSON Validator
Validates uploaded JSON files against a chosen schema

`Game` folder
------
Contains all the code needed for the game to run in development mode

### Debugging with Story Viewer
A debug view of the story is available for development of the game. It shows the graph of the current story and the current story node that the player is in. For more information on how to enable this debugging tool, see [this](hello)

### Game Controls
**Arrow keys:** move

**Z:** interact

How to Run
------
> Requirements: Node.js needs to be installed
>> Don't forget to install node modules in `Framework`, `Game` and `StoryViewer` folders by running `npm install` first

### Story Viewer
1. Create `StoryViewer/.env` file according to the .env.example provided in the folder
2. In `StoryViewer` folder run `npm run dev`
3. Access the Story Viewer and the validator in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_ENV>**

### Game - Development Mode
1. Create a `Game/.env` file acording to the .env.example provided in the folder
    * STORYVIEWER_DEBUGGING -- this variable should be set to true if you want to use the Story Viewer for debugging
    * STORYVIEWER_URL -- if STORYVIEWER_DEBUGGING=true, then this variable should contain the url where the story viewer is being served
2. (If you don't want to debug using the Story Viewer, skip this step) Start the Story Viewer server as explained above
3. In `Game` folder run `npm run dev` to start the dev server of the game
4. Access the game in **http://<span></span>localhost:8080</span>**

### Build a production ready version of the game
1. In `Game` folder run `npm run build`
2. The resultant files are available in `Game/dist` folder

### Build a production ready version of the framework
1. In `Framework` folder run `npm run build`
2. The resultant files are available in `Framework/dist`
