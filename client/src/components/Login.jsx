import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';
import API from '../utils/API';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
  // set the initial component state
  state = {
    toggleForms: false,
    errors: {},
    successMessage: "",
    user: {
      email: "",
      name: "",
      password: ""
    },
    secretData: ""
  }
  
  componentDidMount(){
    API.dashboard(Auth.getToken())
    .then(res => {
      this.setState({
          secretData: res.data.message,
          user: res.data.user
        });
    })
    
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.setState({ successMessage });
    console.log("LoginPage, this.state =", this.state);
  }
  
  componentWillUnmount(){
    this.setState({
      errors: {}
    });
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

  Dashboard = ({ secretData, user }) => (
    <div className="container">
      <div className="title"
        title="Dashboard"
        subtitle="You should get access to this page only after authentication."
      />
      {secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</p>}
    </div>
  );

  SignUpForm() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.processSignupForm}>
          <h2 className="card-heading">Sign Up</h2>
          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
    
          <div className="field-line">
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={this.state.errors.name}
              onChange={this.changeUser}
              value={this.state.user.name}
            />
          </div>
    
          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.state.errors.email}
              onChange={this.changeUser}
              value={this.state.user.email}
            />
          </div>
    
          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.changeUser}
              errorText={this.state.errors.password}
              value={this.state.user.password}
            />
          </div>
    
          <div className="button-line">
            <RaisedButton type="submit" label="Create New Account" primary />
            <CardText>Already have an account? <RaisedButton onClick={this.toggleForms}>Sign in</RaisedButton>.</CardText>

          </div>
        </form>
      </Card>
    )
  };
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processSignupForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();
    
    // create a string for an HTTP body message
    const { name, email, password } = this.state.user;

    //const formData = `email=${email}&password=${password}`;
    API.signUp({name, email, password}).then(res => {
      // change the component-container state
      // set a message
      localStorage.setItem('successMessage', res.data.message);

      // redirect user after sign up to login page
      this.props.history.push('/login');
      this.setState({
        errors: {}
      });
    }).catch(( {response} ) => {
      const errors = response.data.errors ? response.data.errors : {};
      errors.summary = response.data.message;
      this.setState({
        errors
      });
    });
  }
  
  LoginForm() {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.processLoginForm}>
          <h2 className="card-heading">Login</h2>
  
          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
  
          <div className="field-line">
            <TextField
              floatingLabelText="Email"
              name="email"
              errorText={this.state.errors.email}
              onChange={this.changeUser}
              value={this.state.user.email}
            />
          </div>
  
          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              onChange={this.changeUser}
              errorText={this.state.errors.password}
              value={this.state.user.password}
            />
          </div>
  
          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>
  
          <CardText>Don't have an account? <RaisedButton onClick={this.toggleForms}>Create one</RaisedButton>.</CardText>
        </form>
      </Card>
    )
  }
 
  processLoginForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = this.state.user;

    API.login({email, password}).then(res => {
        // save the token
        Auth.authenticateUser(res.data.token);

        // update authenticated state
        this.props.toggleAuthenticateStatus()
        
        // refreshes UserPage on successful signin
        this.props.refreshUserScreen();
        
    }).catch(( {response} ) => {

        const errors = response.data.errors ? response.data.errors : {};
        errors.summary = response.data.message;

        this.setState({
          errors
        });
      });
    
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

  logOutUser = () => {
    Auth.deauthenticateUser();
    this.props.refreshUserScreen;
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        {this.props.authenticated ? (
          <div className="top-bar-right">
            <div className="container">
              <div
                title="Dashboard"
                subtitle="You should get access to this page only after authentication."
              />
              {this.state.secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{this.state.user.name}</strong>!<br />{this.state.secretData}</p>}
            </div>
            <button onClick={this.logOutUser}>Log out</button>
          </div>
        ) : (
          <div className="top-bar-right">
            {this.state.toggleForms ? (
              <div>
                {this.LoginForm()}
              </div>
            ) : (
              <div>
                {this.SignUpForm()}
              </div>
            )}
            <button className="gameButton smButton" onClick={this.props.viewUserScreenToggle}>Return to Game</button>
          </div>
        )}
      </div>
    )
  }
}

export default Login;
