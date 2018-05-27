import React, { Component } from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import About from "./components/About.jsx";
import Help from "./components/Help.jsx";
import { Input } from "./components/Form";
import loadGame from "./Functions/loadGame";
import updateState from "./Functions/updateState";
import { updateScroll } from "./Functions/utils";
import parseCommand from "./Functions/parseCommand";
import creaturesMove from "./Functions/creaturesMove";
import { Col, Row, Container } from "reactstrap";
import Title from "./components/Title.jsx";
import Inventory from "./components/Inventory.jsx";
import Equipment from "./components/Equipment.jsx";
import Statistics from "./components/Statistics.jsx";
import RoomDesc from "./components/RoomDesc.jsx";
import Auth from './utils/Auth';
import Login from "./components/Login";
import ButtonAreaOne from "./components/ButtonAreaOne"
import ButtonAreaTwo from "./components/ButtonAreaTwo"
import Sidebar from "./components/Sidebar"
// import SavedGames from "./components/SavedGames"
import "./App.css";
import API from './utils/API';

// checks if being viewed in mobile layout
let isMobile = window.innerWidth < 768 ? true : false

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

class App extends Component {

  state = {
    loadData: undefined,
    loadingFreshGame: true,
    inProgress: true,
    authenticated: false,
    viewCharacter: false,
    viewAbout: false,
    viewHelp: false,
    viewUserScreen: true,
    showLoginPage: true,
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
    },
    secretData: '',
    user: {email: '', password: ''}
  }

  handleUserCommand = this.handleUserCommand;  

  componentDidMount() {
    // check if user is logged in on refresh
    console.log("on load, user authenticated? ", Auth.isUserAuthenticated());
    this.toggleAuthenticateStatus()

    // loads game data on first render, skips when components re-render
    if (this.state.loadingFreshGame) {
      // console.log("loading fresh game");
      // upon mounting of game component, populate rooms, creatures, and player with items
      this.setState((prevState, props) => loadGame(prevState, props));
      this.setState({ loadingFreshGame: false });
    }
  }
  
  componentWillUnmount() {
    this.toggleAuthenticateStatus();
    console.log("@GamePage unmount, userAuthenticated =", this.state.authenticated);
  }

  getSecretData = () => {
    API.dashboard(Auth.getToken())
      .then(res => {
        this.setState({
            secretData: res.data.message,
            user: res.data.user,
          });
      })
  }

  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }
  
  logOutUser = () => {
    console.log("logOutUser button clicked");
    Auth.deauthenticateUser();
    this.setState({ authenticated: false }, () => {console.log("App.js state =", this.state)});
  };

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
        attack: this.state.game.attack,
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
    this.setState({viewUserScreen: !this.state.viewUserScreen}, () => {
      if (!this.state.viewUserScreen) updateScroll();
    });
  }

  handleNewGameButton = () => {
    console.log("New Game button firing");
    this.setState((prevState, props) => loadGame(prevState, props), () => {
      this.setState({viewUserScreen: !this.state.viewUserScreen}, () => {
        if (!this.state.viewUserScreen) updateScroll();
      })
    })
  }

  handleLoadGame = data => {

  }

  toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    console.log("in App.js (before toggle): authenticated =", this.state.authenticated);
    this.setState({ authenticated: Auth.isUserAuthenticated() })
    this.getSecretData();
    console.log("in App.js (after toggle): authenticated =", this.state.authenticated);
    console.log("in App.js state =", this.state);
    // this.forceUpdate();
  }

  render() {
    return (
      <Container > 
        {this.state.viewUserScreen ? (
          <div className="home">
            <Login 
              authenticated={this.state.authenticated} 
              viewUserScreenToggle={this.viewUserScreenToggle}
              toggleAuthenticateStatus={this.toggleAuthenticateStatus} 
              handleNewGameButton={this.handleNewGameButton} 
              logOutUser={this.logOutUser}
              user={this.state.user}
              secretData={this.state.secretData}
              changeUser={this.changeUser}
              processLoginForm={this.processLoginForm}
            />
          </div>
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
              viewAbout={this.state.viewAbout} viewAboutToggle={this.viewAboutToggle}
            />
            <Help 
              viewHelp={this.state.viewHelp} viewHelpToggle={this.viewHelpToggle}
            />
            <Row className="no-gutters">
              <Col xs={12} md={{size: 9, order: 2}}>
                <Title>Labyrinth.js</Title>
              </Col>
              <Col xs={6} md={{size: 3, order: 1}} className="buttonArea">
                <ButtonAreaOne
                  authenticated={this.state.authenticated} 
                  handleSaveButton={this.handleSaveButton}
                  viewUserScreenToggle={this.viewUserScreenToggle}
                  viewHelpToggle={this.viewHelpToggle}
                />
              </Col> 
              <Col xs={6} md={{size: 3, order: 5}} className="buttonArea">
                <ButtonAreaTwo
                  authenticated={this.state.authenticated} 
                  toggleAuthenticateStatus={this.toggleAuthenticateStatus}
                  viewUserScreenToggle={this.viewUserScreenToggle}
                  viewAboutToggle={this.viewAboutToggle}
                />
              </Col> 
              <Col xs={12} md={{size: 9, order: 4}}>
                <RoomDesc text={this.state.game.relay} />
              </Col>
              <Col xs={12} md={{size: 9, order: 6}}>
                <form className="userCommandLine">
                  <div className="form-group">
                    <label className="commandInput">>&nbsp;</label>
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
              </Col>
              <Col xs={12} className="d-block d-md-none">
                <button className="gameButton viewCharacterButton" onClick={this.viewCharacterToggle}>Check Yourself</button>
              </Col>
              <Col md={{size: 3, order: 3}} className="d-none d-md-block" id="sidebar">
                <Sidebar 
                  wielded={this.state.game.wielded} 
                  head={this.state.game.head} 
                  body={this.state.game.body} 
                  arms={this.state.game.arms} 
                  legs={this.state.game.legs}
                  health={this.state.game.health}
                  attack={this.state.game.attack} 
                  defense={this.state.game.defense} 
                  moveCount={this.state.game.moveCount}
                  inventory={this.state.game.playerInventory}
                />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    )
  }

}


export default App;
