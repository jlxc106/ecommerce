import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Col, Card, Row, Button } from 'react-materialize';

import * as actions from '../actions';
import Payments from './Payments';
import ProductCard from './ProductCard';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllProducts();
  }

  renderProductList() {
    const { allProducts } = this.props;
    if (allProducts && allProducts.length > 0) {
      return allProducts.map((product, index) => {
        let color = ['teal', 'red darken-1'];
        const { name, description, price, quantity, imageUrl } = product;
        console.log(product);
        return <ProductCard key={index} index={index} product={product} />;
      });
    }
    return <div>Loading products...</div>;
  }

  render() {
    console.log(this.props.auth);
    return (
      <div className="home-div div-horizontal-margin">
        <h4 className="text-red">
          The following list is an example listing, not for sale
        </h4>
        <Row>
          <Col offset="l1 xl1 m1" l={10} xl={10} m={10} s={12}>
            {this.renderProductList()}
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth, allProducts: state.product };
}

export default connect(
  mapStateToProps,
  actions
)(Home);
