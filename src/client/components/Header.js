import React, { Component } from 'react';
import Payments from './Payments';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderHeaderLinks() {
    switch (this.props.auth) {
      case null:
      case false: //user is not logged in
        return (
          <Navbar brand="Jay's Store" right fixed>
            <NavItem href="/auth/google">Sign in with Google</NavItem>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
          </Navbar>
        );
      default:
        // user is logged in
        return (
          <Navbar brand="Jay's Store" right fixed>
            <li className="li-stripe-button">
              <Payments />
            </li>
            {/* <NavItem onClick={() => {}}>
              Credits: {this.props.auth.credits}
            </NavItem> */}
            {/* <NavItem onClick={(event)=>this.onClickMyAccount(event)}>My Account</NavItem> */}
            <li>
              <Link to="my_account">My Account</Link>
            </li>
            <NavItem href="/auth/logout">Logout</NavItem>
          </Navbar>
        );
    }
  }

  onClickMyAccount(event) {
    event.preventDefault();
    this.props.history.push('/my_account');
  }

  render() {
    return <div className="header">{this.renderHeaderLinks()}</div>;
  }
}

export default Header;
