import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import * as actions from '../actions/index';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  handleAdminRequest() {
    const { isAdmin } = this.props.auth;
    if (!isAdmin) {
      this.props.handleAdminRequest();
    }
  }

  renderUserInfo() {
    if (this.props.auth) {
      const { name, email, isAdmin } = this.props.auth;
      console.log(isAdmin);
      return (
        <div>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Store Admin Status: {isAdmin ? 'yes' : 'no'}</p>
        </div>
      );
    }

    return (
      <div>
        <p>Name: {''}</p>
        <p>Email: {''}</p>
        <p>Admin Status: {''}</p>
      </div>
    );
  }

  renderAdminButton() {
    if (this.props.auth) {
      const { isAdmin } = this.props.auth;
      if (isAdmin) {
        return (<Button onClick={()=>this.props.history.push('/admin')}>
        Go to Admin Panel
        </Button>);
      } else {
        return (
          <Button onClick={() => this.handleAdminRequest()}>
            Request to be store vendor*
          </Button>
        );
      }
    }
    return null;
  }

  render() {
    console.log(this.props);
    return (
      <div className="div-horizontal-margin">
        <h3>My Account</h3>
        <br />
        <div>
          <h4>User Info</h4>
          {this.renderUserInfo()}
        </div>
        {this.renderAdminButton()}

        <br />
        <br />
        <span className="red-text">
          *All transactions are configured to go to Jay's bank account. Don't
          expect a check at your door.
        </span>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(
  mapStateToProps,
  actions
)(Account);
