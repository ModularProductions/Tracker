import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const About = (props) => (
  <Modal isOpen={props.viewAbout} toggle={props.viewAboutToggle} className="aboutModal">
    <ModalHeader toggle={props.viewAboutToggle}>About Labyrinth.js</ModalHeader>
    <ModalBody>
      <p class="subtitle">A text-adventure game engine in a MERN-stack environment.</p>

      <h6>Purpose</h6>
      <p>Imports the classic Interactive Fiction genre of games into a modern MERN stack single-page web application, allowing user signup and game saving, or just exploring the game world and solving puzzles from the web browser. Currently version is a working model, showcasing currently implemented environment and features.</p>

      <h6>Usage</h6>
      <p>The application loads right into the game screen, allowing the user to begin their journey by typing commands into the input bar. Patterned after early 1980's-era text adventure games, user commands are short phrases that include verbs, directions, and direct objects. The application will parse the command and decide what effect it has. Taking actions that cause the passage of time will trigger the game's creatures to act out dynamically assigned behavior scripts before the player is allowed to make their next move.
      Player may switch, at any time, to user authentication screen for access to Account Creation and Login functionality. Successful login provides access to previously saved game states.</p>

      <h7>Current Application Features</h7>
      <ul>
        <li><p>Optional user account creation allows saving of game states for later play (in development)</p></li>
        <li><p>Passport-based user authentication</p></li>
        <li><p>MongoDB-based data storage</p></li>
      </ul>
      <h8>Game features</h8>
      <ul>
        <li><p>Command parser with expandable dictionary and response</p></li>
        <li><p>Dark rooms requiring a light source be present for sight</p></li>
        <li><p>Visible exits listed in room description</p></li>
        <li><p>Nonplanar maps with mutable properties</p></li>
        <li><p>Mobile creatures exhibit variable behavior scripts</p></li>
        <li><p>dictated by current 'attitude' (in development)</p></li>
        <li><p>Rooms, items, and creatures are object-based, making them easy to create and integrate</p></li>
      </ul>
      <h8>Interaction examples</h8>
      <ul className="commandExamples">
        <li><p>go north east</p></li>
        <li><p>sw</p></li>
        <li><p>run northwest</p></li>
        <li><p>north</p></li>
        <li><p>walk se</p></li>
        <li><p>take sword</p></li>
        <li><p>drop all</p></li>
        <li><p>search pile</p></li>
        <li><p>examine bust</p></li>
        <li><p>look at cat</p></li>
        <li><p>pick up the brick</p></li>
      </ul>
      <h8>Features currently in development</h8>
      <ul>
        <li><p>Expanded library of creature action scripts</p></li>
        <li><p>Improvement of command parser and expansion of dictionary</p></li>
        <li><p>Strengthening of role-playing-game elements, introducing player and creature statistics, combat, and social interaction</p></li>
      </ul>
      <h6>Potential Future Development</h6>
      <ul>
        <li><p>Improvement of player interaction while on mobile device, replacing keyboard input with button-based system</p></li>
        <li><p>Refactoring into instructional software, allowing organizations to train employees in a custom interactive environment</p></li>
        <li><p>Addition of audio and visual media for a more immersive storytelling experience</p></li>
        <li><p>Improvement of world-building aspect into user-friendly story authoring software for hobbyists or education</p></li>
      </ul>
      <h7>Backend Module dependencies</h7>
      <ul>
        <li><p>`express` (user authentication, save game state)</p></li>
        <li><p>`mongoose` (user authentication, save game state)</p></li>
        <li><p>`body-parser` (server)</p></li>
        <li><p>`reactstrap` (presentation)</p></li>
        <li><p>`morgan` (user authentication)</p></li>
        <li><p>`passport` (user authentication)</p></li>
        <li><p>`passport-local` (user authentication)</p></li>
        <li><p>`jsonwebtoken` (user authentication)</p></li>
        <li><p>`bcryptjs` (user authentication)</p></li>
      </ul>
      <h7>Frontend Module dependencies</h7>
      <ul>
        <li><p>`axios` (user authentication, save game state)</p></li>
      </ul>
    </ModalBody>
    <ModalFooter>
      <button onClick={props.viewAboutToggle}>Close</button>
    </ModalFooter>
  </Modal>
);

export default About;
