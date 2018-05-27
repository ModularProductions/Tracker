import React from 'react';
import Auth from '../utils/Auth';
import API from '../utils/API';

class LogInForm extends React.Component {
  // set the initial component state
  state = {
    errors: {},
    successMessage: "",
    user: {
      email: "",
      password: ""
    }
  }
  
  componentDidMount(){    
    const storedMessage = localStorage.getItem("successMessage");
    let successMessage = "";
    
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem("successMessage");
    }
    this.setState({ successMessage });
  }
  
  processLoginForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = this.props.user;

    API.login({email, password}).then(res => {
        // save the token
        Auth.authenticateUser(res.data.token);
        console.log("successful login, localStorage =", localStorage);
        // update authenticated state
        this.props.toggleAuthenticateStatus();
        // refreshes UserPage on successful signin
        
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

  render() {
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
              onChange={this.props.changeUser}
              value={this.props.user.email}
              />
          </div>

          <div className="field-line">
              <label>password:</label>
            <input
              type="password"
              name="password"
              onChange={this.props.changeUser}
              value={this.props.user.password}
            />
          </div>

          <div className="button-line">
            <button type="submit">Log In</button>
          </div>

          <p className="footnote">Don't have an account? <button onClick={this.props.toggleForms}>Create one</button></p>
        </form>
      </div>
    )
  }
};

export default LogInForm;