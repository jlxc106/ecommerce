import React, { Component } from 'react';

class Account extends Component {
  constructor(props){
    super(props);
  }


  render() {
    console.log(this.props);
    return (
      <div>
        Account Component to be HERE
      </div>
    );
  }
}

export default Account;
