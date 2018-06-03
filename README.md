# LabyrinthJS
A text-adventure game engine in a MERN-stack environment.

## Purpose
Imports the classic Interactive Fiction genre of games into a modern full-stack single-page web application, allowing user signup and game saving, or just exploring the game world and solving puzzles from the web browser. Currently version is a working model, showcasing currently implemented environment and features.

## Usage
The application loads right into the game screen, allowing the user to begin their journey by typing commands into the input bar. Patterned after early 1980's-era text adventure games, user commands are short phrases that include verbs, directions, and direct objects. The application will parse the command and decide what effect it has. Taking actions that cause the passage of time will trigger the game's creatures to act out dynamically assigned behavior scripts before the player is allowed to make their next move.
Player may switch, at any time, to user authentication screen for access to Account Creation and Login functionality. Successful login provides access to previously saved game states.

### Current Application Features
- Optional user account creation allows saving of game states for later play (in development)
- Passport-based user authentication
- MongoDB-based data storage
#### Game features
- Command parser with expandable dictionary and response
- Dark rooms requiring a light source be present for sight
- Visible exits listed in room description
- Nonplanar maps with mutable properties
- Mobile creatures exhibit variable behavior scripts dictated by current 'attitude' (in development) 
- Rooms, items, and creatures are object-based, making them easy to create and integrate
#### Interaction examples
`go north east`
`sw`
`run northwest`
`north`
`walk se`
`take sword`
`drop all`
`search pile`
`examine bust`
`look at cat`
`pick up the brick`

#### Features currently in development
- Expanded library of creature action scripts
- Improvement of command parser and expansion of dictionary
- Strengthening of role-playing-game elements, introducing player and creature statistics, combat, and social interaction

### Potential Future Development
- Improvement of player interaction while on mobile device, replacing keyboard input with button-based system
- Addition of audio and visual media for a more immersive storytelling experience
- Refactoring into instructional software, allowing organizations to train employees in a custom interactive environment
- Improvement of world-building aspect into user-friendly story authoring software for hobbyists or education
- Integration of voice recognition and audio for blind players

## Backend Module dependencies
`express` (user authentication, save game state)
`mongoose` (user authentication, save game state)
`body-parser` (server)
`reactstrap` (presentation)
`morgan` (user authentication)
`passport` (user authentication)
`passport-local` (user authentication)
`jsonwebtoken` (user authentication)
`bcryptjs` (user authentication)
`react-moment` (presentation)

## Frontend Module dependencies
`axios` (user authentication, save game state)

## Features
Bootstrap v4.1
Built mobile-first
