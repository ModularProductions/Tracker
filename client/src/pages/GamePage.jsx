import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import About from "../components/About.jsx";
import Help from "../components/Help.jsx";
import Game from "../components/Game";
import Inventory from "../components/Inventory.jsx";
import Equipment from "../components/Equipment.jsx";
import Statistics from "../components/Statistics.jsx";
import { Input } from "../components/Form";
import UserScreen from "../pages/UserScreen.jsx";

// import game functions
import loadGame from "../Functions/loadGame";
import updateState from "../Functions/updateState";
import { updateScroll } from "../Functions/utils";
import parseCommand from "../Functions/parseCommand";
import creaturesMove from "../Functions/creaturesMove";

// checks if being viewed in mobile layout
let isMobile = window.innerWidth < 768 ? true : false

class GamePage extends React.Component {

  componentDidMount() {

    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();

    // loads game data on first render, skips when components re-render
    if (this.state.loadingFreshGame) {
      console.log("loading fresh game");
      // upon mounting of game component, populate rooms, creatures, and player with items
      this.setState((prevState, props) => loadGame(prevState, props));
      this.setState({ loadingFreshGame: false });
    }
  }

  state = {
    loadingFreshGame: true,
    inProgress: true,
    authenticated: this.props.authenticated,
    viewCharacter: false,
    viewAbout: false,
    viewHelp: false,
    viewUserScreen: false,
    isMobile: isMobile,
    userCommand: "",
    lastCommand: "",
    // below loaded in loadGame(), below exists so components render
    game: {
      playerLocation: "two",
      playerInventory: [],
      room: {}, 
      allCreatures: {},
      relay: [],
      health: 100,
      attack: 0,
      defense: 3,
      moveCount: 0,
      wielded: undefined,
      head: undefined,
      body: undefined,
      arms: undefined,
      legs: undefined,
      modifiers: {
        blind: undefined
      },
      options: {
        verbose: true,
      }
    }
  };

  handleUserCommand = this.handleUserCommand.bind(this);  

  // *
  // * HANDLE PLAYER COMMAND INPUT
  // *

  handleInputChange = event => this.setState({ userCommand: event.target.value });

  async handleUserCommand(event) {
    event.preventDefault();
    // check for non-empty command input
    
    // initialize fresh datastream
    if (this.state.userCommand) {
      let currData = { relay: [], state: {
        playerLocation: this.state.game.playerLocation,
        playerInventory: this.state.game.playerInventory,
        room: this.state.game.room, 
        allCreatures: this.state.game.allCreatures,
        relay: this.state.game.relay,
        health: this.state.game.health,
        attack: this.state.game.health,
        defense: this.state.game.defense,
        moveCount: this.state.game.moveCount,
        wielded: this.state.game.wielded,
        head: this.state.game.head,
        body: this.state.game.body,
        arms: this.state.game.arms,
        legs: this.state.game.legs,
        modifiers: this.state.game.modifiers,
        options: this.state.game.modifiers
      }, takesTime: false };
      console.log("*** command entered:", this.state.userCommand, "***");

      // add user command to relay
      currData.relay.push("> "+this.state.userCommand);

      // start command processing here      
      currData = parseCommand(this.state.userCommand, currData);
      // console.log("currData returned from parseCommand() =", currData);

      // advance game time, resolve entity action
      if (currData.takesTime) {
        currData = creaturesMove(currData);
        currData.state.moveCount++; 
      }

      // incorporate datastream into component state
      await this.setState((prevState, props) => (updateState(prevState, props, currData)));

      // assure roomDesc window is scrolled to bottom
      updateScroll();

    }
  }

  // *
  // * BUTTON HANDLING
  // *

  viewCharacterToggle = () => {
    this.setState({viewCharacter: !this.state.viewCharacter});
  }

  viewAboutToggle = () => {
    this.setState({viewAbout: !this.state.viewAbout});
  }

  viewHelpToggle = () => {
    this.setState({viewHelp: !this.state.viewHelp});
  }

  viewUserScreenToggle = () => {
    console.log('toggle hit')
    this.setState({viewUserScreen: !this.state.viewUserScreen});
  }
  
  render() {
    return (
      <div>
        {this.state.viewUserScreen ? (
          <UserScreen className="userScreen"
            authenticated={this.props.authenticated} 
            viewUserScreenToggle={this.viewUserScreenToggle}
            toggleAuthenticateStatus={this.props.toggleAuthenticateStatus} 
          />  
        ) : (
          <div>
            <Modal isOpen={this.state.viewCharacter} toggle={this.viewCharacterToggle} className="characterModal">
              <ModalHeader toggle={this.viewCharacterToggle}>You</ModalHeader>
              <ModalBody>
                <Statistics 
                  health={this.state.game.health}
                  attack={this.state.game.attack} 
                  defense={this.state.game.defense} 
                  moveCount={this.state.game.moveCount}
                />
                <Equipment 
                  wielded={this.state.game.wielded} 
                  head={this.state.game.head} 
                  body={this.state.game.body} 
                  arms={this.state.game.arms} 
                  legs={this.state.game.legs} 
                />
                <Inventory inventory={this.state.game.playerInventory}/>
              </ModalBody>
            </Modal>
            <About 
              viewAbout={this.state.viewAbout}viewAboutToggle={this.viewAboutToggle.bind(this)} />
            <Help 
              viewHelp={this.state.viewHelp} viewHelpToggle={this.viewHelpToggle.bind(this)}/>
            <Game 
              authenticated={this.props.authenticated}
              toggleAuthenticateStatus={this.props.toggleAuthenticateStatus.bind(this)}
              currentState={this.state.game} 
              viewUserScreenToggle={this.viewUserScreenToggle.bind(this)}
              viewAboutToggle={this.viewAboutToggle.bind(this)}
              viewHelpToggle={this.viewHelpToggle.bind(this)}
              viewCharacterToggle={this.viewCharacterToggle.bind(this)}
              handleLoginButton={this.handleLoginButton}
              >
              <form className="userCommandLine">
                <div className="form-group">
                  <label>>&nbsp;</label>
                  <Input
                    value={this.state.userCommand}
                    onChange={this.handleInputChange}
                    name="userCommand"
                    type="text"
                    id="command"
                    data-lpignore="true"
                    autoComplete="off"
                    onClick={(e) => {this.handleUserCommand(e)}} 
                  />
                  <button type="submit" onClick={(e) => {this.handleUserCommand(e)}} className="btn btn-success d-none">Submit</button>
                </div>
              </form>
            </Game>
          </div>
        )}
      </div>
    )

    // original boilerplate
    // return (
    //   <Card className="container">
    //     <CardTitle title="React Application" subtitle="This is the home page." />
    //       {Auth.isUserAuthenticated() ? (
    //         <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
    //       ) : (
    //         <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
    //       )}
    //   </Card>
    // )
    // end original boilerplate
  }
};

export default GamePage;
