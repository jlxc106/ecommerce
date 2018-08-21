import React, { Component } from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

class CheckoutPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props);
    return (
      <div className="div-horizontal-margin div-vertical-margin">
        <Elements>
          <InjectedCheckoutForm history={this.props.history} product={this.props.location.state.product} purchaseQuantity={this.props.location.state.purchaseQuantity}/>
        </Elements>
      </div>
    );
  }
}

export default CheckoutPage;
