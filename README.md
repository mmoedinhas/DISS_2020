# DISS_2020

Repository for my dissertation project in FEUP 2020

## JSON files
Contains the documentation (schema) and examples of the JSON files that are essential to the framework

## StoryViewer folder
Contains the code for the server that serves the framework API, the Story Viewer and the production version of the game

## Game folder
Contains all the code needed for the game to run in development mode

## How to Run
> Requirements: Node.js needs to be installed
>> Don't forget to install node modules in both `StoryViewer` and `Game` folders by running `npm install` first

### Development Mode
1. Create both `StoryViewer/.env` and `Game/.env` files acording to the .env.example provided in the folders
2. In `StoryViewer` folder run `npm run dev` to start the framework API server
3. In `Game` folder run `npm run dev` to start the dev server of the game

### Production Mode
1. Create `StoryViewer/.env` file according to the .env.example provided in the folder
2. Build the game by going to the `Game` folder and running `npm run build`
3. In `StoryViewer` folder run `npm run dev` and access the game in http://localhost:3000/game
