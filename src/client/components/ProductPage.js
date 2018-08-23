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

  componentWillMount() {
    if (!this.props.location.state) {
      const { product_id } = this.props.match.params;
      this.props.getProductById(product_id);
    }
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    if (this.state.productIsValid) {
      return;
    }
    if (this.props.location.state.product && !this.state.productIsValid) {
      this.setState({ productIsValid: true });
    }
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

  handleQuantityChange(e) {
    this.setState({ purchaseQuantity: e.target.value });
  }

  handleCheckout(e) {
    const { quantity, price } = this.props.location.state.product;
    // console.log(this.props.location.state.product);
    if (quantity === 0) {
      window.Materialize.toast('Out of Inventory', 1000);
      return;
    }

    if (price * this.state.purchaseQuantity < 50) {
      window.Materialize.toast(
        'Minimum value for transaction is 50 cents',
        1000
      );
      return;
    }
    this.props.history.push({
      pathname: '/checkout',
      state: {
        product: this.props.location.state.product,
        purchaseQuantity: this.state.purchaseQuantity
      }
    });
  }

  render() {
    // console.log(this.props.location.state);
    if (this.props.error && this.props.error.type === PRODUCT_ERROR) {
      return (
        <div className="div-horizontal-margin">
          <h3 className="center product-error-msg">INVALID PRODUCT ID.</h3>
        </div>
      );
    }
    // let product;
    // if (this.props.location.state && this.props.location.state.product) {
    const product = this.props.location.state.product; //prioritize product object passed from Link
    // }
    // else {
    //   product = this.props.product; // fallback on redux state of product from getProduct
    // }

    if (!this.state.productIsValid || !product || _.isEmpty(product)) {
      return <div>Loading...</div>;
    }
    const { imageUrl, name, description, price, quantity, seller } = product;
    const sellerName = seller.name;

    const imageSrc = imageUrl.map(url=>{
      return `${process.env.AWS_S3_BASE_URL}${url}`
    })

    // console.log(product);
    return (
      <div className="div-horizontal-margin">
        <div className="">
          <Row>
            <Col s={12} m={12} l={5} xl={5} className="product-page-left">
              <Carousel
                className="img-carousel"
                options={{ fullWidth: true }}
                images={imageSrc}
                // images={[
                //   `${process.env.AWS_S3_BASE_URL}${
                //     typeof imageUrl === String ? imageUrl : imageUrl[0]
                //   }`
                // ]}
                options={{
                  noWrap: true
                }}
              />
            </Col>
            <Col s={12} m={12} l={7} xl={7} className="product-page-right">
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
                  <p>{quantity} Items in stock</p>
                </form>
                {/* <Link
                  to={{
                    pathname: '/checkout',
                    state: {
                      product,
                      purchaseQuantity: this.state.purchaseQuantity
                    }
                  }}
                > */}
                <Button
                  onClick={e => this.handleCheckout(e)}
                  disabled={this.userIsLoggedIn() || quantity === 0}
                  className={`blue ${
                    this.userIsLoggedIn() ? 'hide-default' : ''
                  }`}
                >
                  Purchase
                </Button>
                {/* </Link> */}
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
