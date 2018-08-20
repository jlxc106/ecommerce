import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class TestElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Elements>
        <InjectedCheckoutForm />
      </Elements>
    );
  }
}

export default TestElement;
