import React, { Component } from 'react';
import { CardElement } from 'react-stripe-elements';

class CardSection extends Component {
  render() {
    return (
      <label className="checkout-label">
        Card details
        <CardElement style={{ base: { fontSize: '18px' } }} />
      </label>
    );
  }
}

export default CardSection;
