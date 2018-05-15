import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../utils/Auth';
import API from '../utils/API';
import PropTypes from 'prop-types';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <Card className="container">
    <form action="/" onSubmit={onSubmit}>
      <h2 className="card-heading">Login</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="field-line">
        <TextField
          floatingLabelText="Email"
          name="email"
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" primary />
      </div>

      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
    </form>
  </Card>
)

class LoginPage extends React.Component {
  // set the initial component state
  state = {
    errors: {},
    successMessage: '',
    user: {
      email: '',
      password: ''
    }
  }
  
  componentDidMount(){
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    this.setState({ successMessage });
    const loginArgs = 

  }

  componentWillUnmount(){
    this.setState({
          errors: {}
        });
  }
  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm = event => {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const { email, password } = this.state.user;

    API.login({email, password}).then(res => {
        // save the token
        Auth.authenticateUser(res.data.token);

        // update authenticated state
        this.props.toggleAuthenticateStatus()
        
        // redirect signed in user to dashboard
        this.props.history.push('/dashboard');
        
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
  /**
   * Render the component.
   */
  render() {
    return (
      {LoginForm(loginArgs)}
      // <LoginForm
      //   onSubmit={this.processForm}
      //   onChange={this.changeUser}
      //   errors={this.state.errors}
      //   successMessage={this.state.successMessage}
      //   user={this.state.user}
      // />
    );
  }

}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Login;
