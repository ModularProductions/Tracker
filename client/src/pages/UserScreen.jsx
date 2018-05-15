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
  }

  refreshUserScreen = () => {
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        {Auth.isUserAuthenticated() ? (
          <div>
            <button>Load Game</button>
            <button onClick={Auth.deauthenticateUser()}>Log Out</button>
          </div>
        ) : (
          <div>
            <button>Sign Up</button>
            <button>Log In</button>
            <LoginPage
              toggleAuthenticateStatus={this.toggleAuthenticateStatus}
              refreshUserScreen={this.refreshUserScreen} 
            />
          </div>
        )}
      </div>
    )
  }
}

export default UserScreen;