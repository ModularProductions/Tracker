import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ secretData, user }) => (
  <div className="container">
    {secretData && <p>}>Your Uber has dropped you off, <strong>{user.name}</strong>.<br />{secretData}</p>}
    <button><strong>First Game</strong> Moves: 11, Saved: 5/15/18 4:33pm.</button>
    <button onClick={this.props.logOutUser}>Log out</button>
  </div>
);

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;