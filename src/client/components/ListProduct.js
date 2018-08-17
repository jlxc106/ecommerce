import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Collapsible } from 'react-materialize';

import * as actions from '../actions';
import ListItemProduct from './ListItemProduct';

class ListProduct extends Component {
  constructor(props) {
    super(props);
  }

  renderProductList() {
    console.log(this.props.userProduct);
    if (this.props.userProduct.length > 0) {
      return this.props.userProduct.map((item, index) => {
        return (
            <ListItemProduct key={index} item={item} />
        );
      });
    } else {
      return <p>No products</p>;
    }
  }

  render() {
    return (
      <div>
        <Collapsible popout defaultActiveKey={1} className="list list-product">
          {this.renderProductList()}
        </Collapsible>
      </div>
    );
  }
}

function mapStateToProps({ product: { user } }) {
  return { userProduct: user };
}

export default connect(
  mapStateToProps,
  actions
)(ListProduct);
