DISS_2020
======

Repository for my dissertation project at FEUP 2020

`JSON files` folder
------
Contains the documentation (schema) and examples of the JSON files that are essential to the framework

`Framework` folder
------
Contains the code for the server that serves the framework API and the production version of the game

### Framework API
Handles requests to the framework. Main usage case is sending the overall narrative file and user profile and receiving an organized story to display to the user

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

### Game Controls
**Arrow keys:** move

**Z:** interact

How to Run
------
> Requirements: Node.js needs to be installed
>> Don't forget to install node modules in both `Framework`, `Game` and `StoryViewer` folders by running `npm install` first

### Story Viewer
1. Create `StoryViewer/.env` file according to the .env.example provided in the folder
2. In `StoryViewer` folder run `npm run dev`
3. Access the Story Viewer and the validator in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_ENV>**

### Game - Development Mode
1. Create both `Framework/.env` and `Game/.env` files acording to the .env.example provided in the folders
    * Make sure the ports match in both env files
2. In `Framework` folder run `npm run dev` to start the framework API server
3. In `Game` folder run `npm run dev` to start the dev server of the game
4. Access the game in **http://<span></span>localhost:8080</span>**

### Game - Production Mode
1. Create `Framework/.env` file according to the .env.example provided in the folder
2. Build the game by going to the `Game` folder and running `npm run build`
3. In `Framework` folder run `npm run dev`
4. Access the game in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_FRAMEWORK_ENV>**
