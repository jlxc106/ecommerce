import React, { Component } from 'react';
import { Card, Button, Col, Row } from 'react-materialize';
import { Link } from 'react-router-dom';

// import Payments from './Payments';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseQuantity: 1
    };
  }

  handleQuantityChange(e) {
    this.setState({ purchaseQuantity: e.target.value });
  }

  renderQuantity() {
    let totalQuantity = this.props.product.quantity;
    let renderOptions = ['hide-default', 'hide-default'];
    // console.log(this.props.product.quantity);
    let hideSoldOut = 'hide-default';

    if (totalQuantity == 0) {
      hideSoldOut = null;
    }
    if (totalQuantity > 1) {
      renderOptions[0] = null;
    }
    if (totalQuantity > 2) {
      renderOptions[1] = null;
    }

    return { hideSoldOut, renderOptions };
  }

  renderList() {
    let listToBeRendered = [];
    for (var i = 1; i <= this.props.product.quantity; i++) {
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

  renderPrice() {
    const { price } = this.props.product;
    const cumulativePrice = price * this.state.purchaseQuantity;
    if (cumulativePrice < 100) return `0.${cumulativePrice}`;
    else {
      let cents = parseInt(cumulativePrice % 100) || '00';
      let dollars = parseInt(cumulativePrice / 100);
      return `${dollars}.${cents}`;
    }
  }

  render() {
    let hideSoldOut = 'hide-default';
    if (this.props.product.quantity == 0) {
      hideSoldOut = null;
    }
    const { index, product } = this.props;
    const { name, description, price, quantity, imageUrl } = product;
    return (
      <Card
        // onClick={() => console.log(1)}
        key={index}
        product={product}
        className="border-teal"
        textClassName="black-text"
        title={name}
        actions={[
          <Link key={index} to="/product_page">{`${name} product page`}</Link>
        ]}
      >
        <Row>
          <Col s={9} m={9} l={9} xl={9}>
            {imageUrl ? (
              <img
                className="img-product-card"
                src={`https://jlxc106-ecommerce-123.s3.us-west-1.amazonaws.com/${imageUrl}`}
              />
            ) : null}
            <p>{description}</p>
          </Col>
          <Col s={3} m={3} l={3} xl={3}>
            <div className="contain-payment">
              <p className={`text-red ${hideSoldOut}`}>SOLD OUT</p>
              <p>${this.renderPrice()}</p>
              {/* <form className="form-qty">
                qty:{' '}
                <select
                  className="select-qty"
                  name="qty"
                  onChange={e => this.handleQuantityChange(e)}
                  disabled={quantity == 0 ? true : false}
                >
                  {this.renderList()}
                </select>
              </form> */}
              <Link to={{
                pathname: "/product_page", 
                state: {
                  product 
                }}}>
                <Button
                  className="blue btn-margin"
                >
                  Product Page
                </Button>
              </Link>
              {/* <Payments
                purchaseQuantity={this.state.purchaseQuantity}
                product={product}
              /> */}
              <p>Total Quantity Remaining: {quantity}</p>
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ProductCard;
