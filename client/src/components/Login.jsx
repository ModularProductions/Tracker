import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';

class Login extends React.Component {
  // set the initial component state
  state = {
    authenticated: this.props.authenticated,
    toggleForms: false,
    errors: {},
    successMessage: "",
    user: {
      name: "",
      email: "",
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
  }
  
  componentWillUnmount(){
    this.toggleAuthenticateStatus;
    this.setState({
      errors: {}
    });
  }

  refreshUserScreen = () => {
    this.props.toggleAuthenticateStatus();
    this.forceUpdate();
  }

  toggleForms = () => {

    // this.forceUpdate();
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
      <div className="container">
        <div className="title"
          title="Dashboard"
          subtitle="You should get access to this page only after authentication."
          />
        <p>Saved games here.</p>
        {secretData && <p style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong>!<br />{secretData}</p>}
        <button onClick={this.logOutUser}>Log out</button>
      </div>
    )
  };

  SignUpForm() {
    return (
      <div className="container">
        <form action="/" onSubmit={this.processSignupForm}>
          <h2 className="card-heading">Sign Up</h2>
          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
    
          <div className="field-line">
          <label>name:</label>
            <input
              name="name"
              onChange={this.changeUser}
              value={this.state.user.name}
            />
          </div>
    
          <div className="field-line">
          <label>email: </label>
            <input
              name="email"
              onChange={this.changeUser}
              value={this.state.user.email}
            />
          </div>
    
          <div className="field-line">
          <label>password:</label>
            <input
              type="password"
              name="password"
              onChange={this.changeUser}
              value={this.state.user.password}
            />
          </div>
    
          <div className="button-line">
            <button type="submit">Create New Account</button>
          </div>
          <p className="footnote">Already have an account? <button onClick={this.toggleForms}>Sign in</button></p>
        </form>
      </div>
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
      console.log("test:", res);

      // change the component-container state
      // set a message
      localStorage.setItem('successMessage', res.data.message);

      // redirect user after sign up to login page

      this.refreshUserScreen();
    }).catch(( {response} ) => {
      const errors = response.data.errors ? response.data.errors : {};
      errors.summary = response.data.message;
      this.setState({
        errors
      });
    });
  }
  
  LoginForm = () => {
    return (
      <div className="container">
        <form action="/" onSubmit={this.processLoginForm}>
          <h2 className="card-heading">Login</h2>
  
          {this.state.successMessage && <p className="success-message">{this.state.successMessage}</p>}
          {this.state.errors.summary && <p className="error-message">{this.state.errors.summary}</p>}
  
          <div className="field-line">
            <label>email:</label>
            <input
              name="email"
              onChange={this.changeUser}
              value={this.state.user.email}
              />
          </div>
  
          <div className="field-line">
              <label>password:</label>
            <input
              type="password"
              name="password"
              onChange={this.changeUser}
              value={this.state.user.password}
            />
          </div>
  
          <div className="button-line">
            <button type="submit">Log In</button>
          </div>
  
          <p className="footnote">Don't have an account? <button onClick={this.toggleForms}>Create one</button></p>
        </form>
      </div>
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
        
        // refreshes UserPage on successful signin
        this.refreshUserScreen();
        
    }).catch(error => {
      console.log("error", error);
      const {response} = error;
      const errors = response.data.errors ? response.data.errors : {};
      errors.summary = response.data.message;

      this.setState({
        errors
      });
    });
    
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
    Auth.deauthenticateUser();
    this.toggleAuthenticateStatus;
    // this.props.refreshUserScreen;
  }

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
                {this.LoginForm()}
              </div>
            ) : (
              <div>
                {this.SignUpForm()}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Login;
