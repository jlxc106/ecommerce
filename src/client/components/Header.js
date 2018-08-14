import React, { Component } from 'react';
import Payments from './Payments';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
//

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderHeaderLinks() {
    switch (this.props.auth) {
      case null:
        return;
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
            <li>Credits: {this.props.auth.credits}</li>
            <li>
              <Link to="my_account">
                <Icon>person</Icon>
              </Link>
            </li>
            <NavItem href="/auth/logout">Logout</NavItem>
          </Navbar>
        );
      // <NavBar>

      // </NavBar>
      // <a href="/auth/logout">Logout</a>;
    }
  }

  onClickCredits(event) {}

  render() {
    // let welcomeMessage = <a href="/auth/google">Sign In with Google</a>;

    // if (this.props.auth) {
    //   welcomeMessage = <a href="">log out</a>;
    // }
    console.log(this.props.auth);

    return (
      <div className="header">{this.renderHeaderLinks()}</div>
      // <div className="header">
      //   <div className="header-item">Custom Store</div>
      //   <Payments />
      //   <div>credits: {this.props.auth ? this.props.auth.credits: 0}</div>
      //   <div className="header-item">{this.renderHeaderLinks()}</div>
      // </div>
    );
  }
}

export default Header;
