import React from 'react';
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import SavedGames from "./SavedGames";

class Login extends React.Component {
  state = {
    toggleForms: false,
  }

  refreshUserScreen = () => {
    console.log("in Login.jsx refreshUserScreen(), authenticated =", this.state.authenticated);
    this.forceUpdate();
  }

  toggleForms = () => {
    this.setState({ toggleForms: !this.state.toggleForms })
  }

  Dashboard() {
    return (
      <div className="dashboard">
        {/* <p>Saved games here.</p> */}
        {this.props.secretData && <p>Your Uber has dropped you off, <strong>{this.props.user.name}</strong>.<br />{this.props.secretData}</p>}
        <SavedGames
          handleLoadGame={this.props.handleLoadGame}
          userID={this.props.user.email}
        />
        {/* <button><strong>First Game</strong> Moves: 11, Saved: 5/15/18 4:33pm.</button> */}
        <button onClick={this.props.logOutUser}>Log out</button>
      </div>
    )
  };

  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <div className="user-form">
            <div className="container">
              {this.Dashboard()}
            </div>
          </div>
        ) : (
          <div className="user-form">
            {this.state.toggleForms ? (
              <div>
                <LogInForm
                  toggleAuthenticateStatus={this.props.toggleAuthenticateStatus} 
                  refreshUserScreen={this.refreshUserScreen}
                  toggleForms={this.toggleForms}
                  user={this.props.user}
                  changeUser={this.props.changeUser}
                  processLoginForm={this.props.processLoginForm}
                  />
              </div>
            ) : (
              <div>
                <SignUpForm
                  toggleAuthenticateStatus={this.props.toggleAuthenticateStatus} 
                  refreshUserScreen={this.refreshUserScreen}
                  toggleForms={this.toggleForms}
                  changeUser={this.props.changeUser}
                  processLoginForm={this.props.processLoginForm}
                  user={this.props.user}
                />
              </div>
            )}
          </div>
        )}
        <button className="gameButton smButton" onClick={this.props.viewUserScreenToggle}>Return to Game</button>
        <button className="gameButton smButton" onClick={this.props.handleNewGameButton}>Start New Game</button>
      </div>
    )
  }
}

export default Login;
