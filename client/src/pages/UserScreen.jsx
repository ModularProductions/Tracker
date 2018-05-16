import React from "react";
import LoginPage from "../components/LoginPage";
import SignUpForm from "../components/SignUpForm";
import LogoutFunction from "../components/LogoutFunction";
import Dashboard from "../components/Dashboard";
import API from '../utils/API';
import Auth from '../utils/Auth';
import { PropTypes } from "react";


class UserScreen extends React.Component {


  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus();
    console.log("@GamePage mount, userAuthenticated =", this.props.authenticated);
  }

  refreshUserScreen = () => {
    this.forceUpdate();
  }

  logOutUser = () => {
    Auth.deauthenticateUser();
    console.log("log out button fired");
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.toggleAuthenticateStatus();
    console.log("@GamePage unmount, userAuthenticated =", this.props.authenticated);
  }
  state = {
    authenticated: this.props.authenticated
  }

  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <div>
            <button>Load Game</button>
            <p>load game buttons here</p>
            <button onClick={this.logOutUser}>Log Out</button>
          </div>
        ) : (
          <div>
            <button>Sign Up</button>
            <button>Log In</button>
            <LoginPage
              toggleAuthenticateStatus={this.props.toggleAuthenticateStatus}
              refreshUserScreen={this.refreshUserScreen}
              viewUserScreenToggle={this.viewUserScreenToggle}
            />
          </div>
        )}
      </div>
    )
  }
}

export default UserScreen;