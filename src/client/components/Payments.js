import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Button, Icon } from 'react-materialize';

class Payments extends Component {
  handleToken(token) {
    const { purchaseQuantity } = this.props;
    const { description, name, price, quantity, _id } = this.props.product;
    if (price * purchaseQuantity < 50) {
      window.Materialize.toast(
        'Minimum value for transaction is 50 cents',
        10000
      );
      console.error('minimum value for transaction is 50 cents');
      return;
    }
    token = {
      ...token,
      description,
      name,
      price,
      purchaseQuantity,
      quantity,
      productId: _id
    };
    this.props.handleToken(token);
  }

  render() {
    const { purchaseQuantity } = this.props;
    const { description, name, price, quantity } = this.props.product;
    return (
      <StripeCheckout
        disabled={quantity == 0 ? true : false}
        name={`Buy ${name}`}
        description={description}
        amount={purchaseQuantity * price}
        token={token => this.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button disabled={quantity == 0 ? true : false} className="blue">
          Purchase
        </Button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
