import React from "react";
import "./Game.css";
// import { Col, Row, Grid, Clearfix } from "react-bootstrap";
import { Col, Row, Container } from "reactstrap";
import Title from "../Title.jsx";
import Inventory from "../Inventory.jsx";
import Equipment from "../Equipment.jsx";
import Statistics from "../Statistics.jsx";
import RoomDesc from "../RoomDesc.jsx";
// import { Link } from "react-router-dom";
import Auth from '../../utils/Auth';
import API from '../../utils/API';


class Game extends React.Component {

  state ={
    authenticated: this.props.authenticated
  }

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();
    console.log("@Game mount, userAuthenticated =", this.props.authenticated);
  }

  handleSaveButton = (userData, gameData) => {
    // console.log("Save button firing");
    // API.saveGame({
    //   email: userData.email,
    //   created: new Date(),
    //   moveCount: gameData.moveCount,
    //   location: gameData.room[gameData.playerLocation].name,
    //   state: gameData
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // ;


    // API.saveState({
    //   id: data.id,
    //   headline: data.headline,
    //   snippet: data.snippet,
    //   datePublished: data.date,
    //   url: data.url
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))
    // ;
  };

  render() {
    return (
      <Container >
        <Row className="no-gutters">
          <Col xs={12} md={{size: 9, order: 2}}>
            <Title>Labyrinth.js</Title>
          </Col>
          <Col xs={6} md={{size: 3, order: 1}} className="buttonArea">
    
            {this.props.authenticated ? (
              <button className="gameButton smButton" onClick={this.handleSaveButton(this.props.userData, this.props.currentState)}>Save Game</button>
            ) : (
              <button className="gameButton smButton" onClick={this.props.viewUserScreenToggle}>Log In</button>
            )}
    
            <button className="gameButton smButton" onClick={this.props.viewHelpToggle}>Help</button>

          </Col>
          <Col xs={6} md={{size: 3, order: 5}} className="buttonArea">
            <button className="gameButton smButton" onClick={this.props.viewAboutToggle}>About</button>
            <button className="gameButton smButton" onClick={this.props.viewUserScreenToggle}>Quit</button>
          </Col>
          <Col xs={12} md={{size: 9, order: 4}}>
            <RoomDesc text={this.props.currentState.relay} />
          </Col>
          <Col xs={12} md={{size: 9, order: 6}}>
            {this.props.children}
          </Col>
          <Col xs={12} className="d-block d-md-none">
            <button className="gameButton viewCharacterButton" onClick={this.props.viewCharacterToggle}>Check Yourself</button>
          </Col>
          <Col md={{size: 3, order: 3}} className="d-none d-md-block" id="playerArea">
            <Inventory inventory={this.props.currentState.playerInventory}/>
            <Equipment 
                wielded={this.props.currentState.wielded} 
                head={this.props.currentState.head} 
                body={this.props.currentState.body} 
                arms={this.props.currentState.arms} 
                legs={this.props.currentState.legs}
              />
            <Statistics
              health={this.props.currentState.health}
              attack={this.props.currentState.attack} 
              defense={this.props.currentState.defense} 
              moveCount={this.props.currentState.moveCount}
            />
          </Col>
        </Row>
      </Container >
    )
  }
};

export default Game;
