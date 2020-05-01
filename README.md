DISS_2020
======

Repository for my dissertation project at FEUP 2020

> It's recommended to test the MVP in [dev mode](#development-mode) so that different player types can be tested ([testing different player types](#testing-different-player-types)) 

`JSON files` folder
------
Contains the documentation (schema) and examples of the JSON files that are essential to the framework

`StoryViewer` folder
------
Contains the code for the server that serves the framework API, the Story Viewer and the production version of the game

### Framework API
Handles requests to the framework. Main usage case is sending the overall narrative file and user profile and receiving an organized story to display to the user.

### Story Viewer
Viewing tool for the story. When uploading a overall story file, it displays the story in a graph.

It also validates uploaded JSON files against a chosen schema.

`Game` folder
------
Contains all the code needed for the game to run in development mode

### Game Controls
**Arrow keys:** move

**Z:** interact

How to Run
------
> Requirements: Node.js needs to be installed
>> Don't forget to install node modules in both `StoryViewer` and `Game` folders by running `npm install` first

### Development Mode
1. Create both `StoryViewer/.env` and `Game/.env` files acording to the .env.example provided in the folders
2. In `StoryViewer` folder run `npm run dev` to start the framework API server
3. In `Game` folder run `npm run dev` to start the dev server of the game
4. Access the game in **http://<span></span>localhost:8080</span>**
5. Access the Story Viewer in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_ENV>**

### Production Mode
1. Create `StoryViewer/.env` file according to the .env.example provided in the folder
2. Build the game by going to the `Game` folder and running `npm run build`
3. In `StoryViewer` folder run `npm run dev`
4. Access the game in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_ENV>/game**
5. Access the Story Viewer in **http://<span></span>localhost:<YOUR_PORT_OF_CHOICE_IN_ENV>**

Testing different player types
------
Since there's no form for that yet (sorry) you have to do it in the code. In the file `Game/src/game/main.ts` modify the "playerType" variable to different values for different stories. So far there's two branches: one with anxiety > 8 and a default. To reload the game, just save the changes in the file (the dev server has hot-reload).
