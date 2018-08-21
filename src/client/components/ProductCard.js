import React, { Component } from 'react';
import { Button, Col, Row } from 'react-materialize';
import { Link } from 'react-router-dom';
import Card from '../helpers/customCard';

// import Payments from './Payments';

class ProductCard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   purchaseQuantity: 1
    // };
  }

  handleQuantityChange(e) {
    this.setState({ purchaseQuantity: e.target.value });
  }

  renderQuantity() {
    let totalQuantity = this.props.product.quantity;
    let renderOptions = ['hide-default', 'hide-default'];
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
    if (price < 100) return `0.${price}`;
    else {
      let cents = parseInt(price % 100) || '00';
      let dollars = parseInt(price / 100);
      return `${dollars}.${cents}`;
    }

    // const cumulativePrice = price * this.state.purchaseQuantity;
    // if (cumulativePrice < 100) return `0.${cumulativePrice}`;
    // else {
    //   let cents = parseInt(cumulativePrice % 100) || '00';
    //   let dollars = parseInt(cumulativePrice / 100);
    //   return `${dollars}.${cents}`;
    // }
  }

  render() {
    let hideSoldOut = 'hide-default';
    if (this.props.product.quantity == 0) {
      hideSoldOut = null;
    }
    const { index, product } = this.props;
    const { _id, name, description, price, quantity, imageUrl } = product;
    return (
      <Card
        key={index}
        product={product}
        className="border-teal"
        textClassName="black-text"
        title={name}
        titleUrl={
          <Link
            key={index}
            to={{
              pathname: `/product_page/${_id}`,
              state: {
                product
              }
            }}
          >
            {name}
          </Link>
        }
        actions={[
          <Link
            key={index}
            to={{
              pathname: `/product_page/${_id}`,
              state: {
                product
              }
            }}
          >
            {`${name} product page`}
          </Link>
        ]}
      >
        <Row>
          <Col className="abc" s={12} m={12} l={9} xl={9}>
            {imageUrl ? (
              <Link
                key={index}
                to={{
                  pathname: `/product_page/${_id}`,
                  state: {
                    product
                  }
                }}
              >
                <img
                  className="img-product-card"
                  src={`${process.env.AWS_S3_BASE_URL}${imageUrl}`}
                />
              </Link>
            ) : null}
            <p>{description}</p>
          </Col>
          <Col className="abc" s={12} m={12} l={3} xl={3}>
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
              <Link
                to={{
                  pathname: `/product_page/${_id}`,
                  state: {
                    product
                  }
                }}
              >
                <Button className="blue btn-margin">Product Page</Button>
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
