import React, { Component } from 'react';

import { Row, Col, Carousel, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import * as actions from '../actions';
import { PRODUCT_ERROR } from '../actions';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchaseQuantity: 1,
      productIsValid: false
    };
  }

  handleQuantityChange(e) {
    this.setState({ purchaseQuantity: e.target.value });
  }

  componentWillMount() {
    if (!this.props.location.state) {
      const { product_id } = this.props.match.params;
      this.props.getProductById(product_id);
    }
    this.componentDidUpdate();
  }

  renderPrice(price) {
    const cumulativePrice = price * this.state.purchaseQuantity;
    if (cumulativePrice < 100) return `0.${cumulativePrice}`;
    else {
      let cents = parseInt(cumulativePrice % 100) || '00';
      let dollars = parseInt(cumulativePrice / 100);
      return `${dollars}.${cents}`;
    }
  }

  userIsLoggedIn() {
    if (this.props.auth) {
      return false;
    }
    return true;
  }

  renderQuantityList(quantity) {
    let listToBeRendered = [];
    for (var i = 1; i <= quantity; i++) {
      if (i > 20) {
        break;
      }
      if (i === 1) {
        listToBeRendered.push(
          <option key={i} default value="1">
            1
          </option>
        );
      } else {
        listToBeRendered.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return listToBeRendered;
  }

  componentDidUpdate() {
    if (this.state.productIsValid) {
      return;
    }
    let product;
    if (this.props.location.state && this.props.location.state.product) {
      product = this.props.location.state.product;
    } else {
      product = this.props.product;
    }
    if (product && !this.state.productIsValid) {
      this.setState({ productIsValid: true });
    }
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    if (this.props.error && this.props.error.type === PRODUCT_ERROR) {
      return (
        <div className="div-horizontal-margin">
          <h3 className="center product-error-msg">INVALID PRODUCT ID.</h3>
        </div>
      );
    }
    let product;
    if (this.props.location.state && this.props.location.state.product) {
      product = this.props.location.state.product; //prioritize product object passed from Link
    } else {
      product = this.props.product; // fallback on redux state of product from getProduct
    }

    if (!this.state.productIsValid || !product || _.isEmpty(product)) {
      return <div>Loading...</div>;
    }
    const { imageUrl, name, description, price, quantity, seller } = product;
    const sellerName = seller.name;
    return (
      <div className="div-horizontal-margin">
        <div className="">
          <Row>
            <Col s={5} m={5} l={5} xl={5} className="product-page-left">
              <Carousel
                className="img-carousel"
                images={[`${process.env.AWS_S3_BASE_URL}${imageUrl}`]}
                options={{
                  noWrap: true
                }}
              />
            </Col>
            <Col s={7} m={7} l={7} xl={7} className="product-page-right">
              <div>
                <h4 className="product-name">{name}</h4>
              </div>
              <hr />
              <div>
                <p>{description}</p>
                <p>Sold by: {sellerName}</p>
                <p>Price: ${this.renderPrice(price)}</p>
                <form className="form-qty">
                  qty:{' '}
                  <select
                    className="select-qty"
                    name="qty"
                    onChange={e => this.handleQuantityChange(e)}
                    disabled={quantity == 0 ? true : false}
                  >
                    {this.renderQuantityList(quantity)}
                  </select>
                </form>
                <Button
                  disabled={this.userIsLoggedIn()}
                  className={`blue ${
                    this.userIsLoggedIn() ? 'hide-default' : ''
                  }`}
                >
                  Purchase
                </Button>
                <Link to="/signIn">
                  <Button
                    disabled={!this.userIsLoggedIn()}
                    className={`${this.userIsLoggedIn() ? '' : 'hide-default'}`}
                  >
                    Sign In to Purchase
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, product, error }) {
  return { auth, product, error };
}

export default connect(
  mapStateToProps,
  actions
)(ProductPage);
