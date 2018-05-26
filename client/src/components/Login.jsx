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
  
  // componentDidMount() {
  //   if (Auth.isUserAuthenticated()) {
  //     console.log("in Login.jsx cWM, Auth.isUserAuthenticated = true");
  //     this.props.toggleAuthenticateStatus();
  //     this.setState({ authenticated: true });
  //     this.getSecretData();
  //   }
  // }

  // componentDidUpdate() {
  //   console.log("Login.jsx componentDidUpdate firing");
  //   console.log("Login.jsx state =", this.state);
  // }
  // componentDidMount() {
  //   API.dashboard(Auth.getToken())
  //   .then(res => {
  //     this.setState({
  //         secretData: res.data.message,
  //         user: res.data.user
  //       });
  //   })
  // }

  refreshUserScreen = () => {
    console.log("in Login.jsx refreshUserScreen(), authenticated =", this.state.authenticated);
    this.forceUpdate();
  }

  toggleForms = () => {
    this.setState({ toggleForms: !this.state.toggleForms })
  }

  // getSecretData = () => {
  //   API.dashboard(Auth.getToken())
  //     .then(res => {
  //       this.setState({
  //           secretData: res.data.message,
  //           user: res.data.user,
  //         });
  //     })
  // }
  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  // changeUser = event => {
  //   const field = event.target.name;
  //   const user = this.state.user;
  //   user[field] = event.target.value;

  //   this.setState({
  //     user
  //   });
  // }

  Dashboard({ secretData, user }) {
    return (
      <div className="dashboard">
        {/* <p>Saved games here.</p> */}
    {this.props.secretData && <p>Your Uber has dropped you off, <strong>{this.props.user.name}</strong>.<br />{this.props.secretData}</p>}
        <button><strong>First Game</strong> Moves: 11, Saved: 5/15/18 4:33pm.</button>
        <button onClick={this.props.logOutUser}>Log out</button>
      </div>
    )
  };

  // authenticationStatusChange = () => {
  //   this.setState({ authenticated: Auth.isUserAuthenticated()})
  // }
  // toggleAuthenticateStatus = () => {
  //   console.log("Login.jsx toggleAuthenticateStatus firing");
  //   this.setState({ authenticated: Auth.isUserAuthenticated() });
  //   this.getSecretData();
  //   this.props.toggleAuthenticateStatus()
  // }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <div className="user-form">
            <div className="container">
              {this.Dashboard(this.props.secretData, this.props.user.name)}
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
