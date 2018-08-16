import React, { Component } from 'react';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';

import ListProduct from './ListProduct';
import * as actions from '../actions/index';

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  componentWillMount() {
    //   this.props.
  }

  enableEdit() {
    this.setState({
      editMode: true
    });
  }

  render() {
    return (
      <div className="div-horizontal-margin">
        <h1>Admin Panel</h1>
        <hr />
        <div>Your Products</div>
        <ListProduct />
        <Button className="orange" onClick={() => this.enableEdit()}>
          Edit
        </Button>
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
)(AdminPanel);
