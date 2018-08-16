import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import ListItemProduct from './ListItemProduct';

class ListProduct extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUserProducts();
  }

  renderProductList() {
      if(this.props.product){

      }
      else{
          return <li>No products</li>
      }
  }

  render() {
    return (
      <div>
        list of products here
        <ul className="list list-product">{this.renderProductList()}</ul>
      </div>
    );
  }
}

function mapStateToProps({ product }) {
  return { product };
}

export default connect(
  mapStateToProps,
  actions
)(ListProduct);
