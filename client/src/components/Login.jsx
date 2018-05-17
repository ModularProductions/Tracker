import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";

class Login extends React.Component {
  // set the initial component state
  state = {
    authenticated: this.props.authenticated,
    toggleForms: false,
    secretData: '',
    user: {}
  }
  
  componentWillMount() {
    API.dashboard(Auth.getToken())
    .then(res => {
      this.props.toggleAuthenticateStatus();
      this.setState({
          secretData: res.data.message,
          user: res.data.user,
        });
    })
  }
  componentDidMount() {
    API.dashboard(Auth.getToken())
    .then(res => {
      this.setState({
          secretData: res.data.message,
          user: res.data.user
        });
    })
  }

  refreshUserScreen = () => {
    this.props.toggleAuthenticateStatus();
    this.forceUpdate();
  }

  toggleForms = () => {
    this.setState({ toggleForms: !this.state.toggleForms })
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser = event => {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  Dashboard({ secretData, user }) {
    return (
      <div className="dashboard">
        {/* <p>Saved games here.</p> */}
    {this.state.secretData && <p>Your Uber has dropped you off, <strong>{this.state.user.name}</strong>.<br />{this.state.secretData}</p>}
        <button><strong>First Game</strong> Moves: 11, Saved: 5/15/18 4:33pm.</button>
        <button onClick={this.props.logOutUser}>Log out</button>
      </div>
    )
  };


  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {this.state.authenticated ? (
          <div className="user-form">
            <div className="container">
              {this.Dashboard(this.state.secretData, this.state.user.name)}
            </div>
          </div>
        ) : (
          <div className="user-form">
            {this.state.toggleForms ? (
              <div>
                <LogInForm
                  toggleAuthenticateStatus={this.toggleAuthenticateStatus} 
                  refreshUserScreen={this.refreshUserScreen}
                  toggleForms={this.toggleForms}
                />
              </div>
            ) : (
              <div>
                <SignUpForm
                  refreshUserScreen={this.refreshUserScreen}
                  toggleForms={this.toggleForms}
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
