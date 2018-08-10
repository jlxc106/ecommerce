import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Sign in with Google</a>;
      default:
        return <a href="/auth/logout">Logout</a>;
    }
  }

  render() {
    // let welcomeMessage = <a href="/auth/google">Sign In with Google</a>;

    // if (this.props.auth) {
    //   welcomeMessage = <a href="">log out</a>;
    // }
    console.log(this.props.auth);

    return (
      <div>
        <div>Custom Store</div>
        <div>{this.renderHeader()}</div>
      </div>
    );
  }
}

export default Header;
