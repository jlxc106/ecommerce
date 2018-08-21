import React, { Component } from 'react';
import { injectStripe } from 'react-stripe-elements';
import { Button } from 'react-materialize';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import CardSection from './CardSection';
import { renderField } from '../../helpers/renderField';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.successfulPurchaseCallback = this.successfulPurchaseCallback.bind(this)
  }

  async handleSubmit(e) {
    // console.log(this.props);
    // We don't want to let default form submission happen here, which would refresh the page.
    e.preventDefault();
    if (!this.props.form.checkout.syncErrors) {
      const purchaseQuantity = this.props.purchaseQuantity;
      const { description, name, price, quantity, _id } = this.props.product;
      const { customerName } = this.props.form.checkout.values;
      let response = await this.props.stripe.createToken({ name: customerName });
      let token = response.token;
      // console.log(`token `, token);
      token = {
        ...token,
        purchaseQuantity,
        description,
        name,
        quantity,
        price,
        productId: _id
      };
      this.props.handleToken(token, this.successfulPurchaseCallback);
    }
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    // this.props.stripe
    //   .createToken({ type: 'card', name: 'Jenny Rosen' })
    //   .then(res => {
    //     console.log('Received Stripe token:', res);
    //   });

    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe
    //   .createSource({ type: 'card', name: 'Jenny Rosen' })
    //   .then(res => {
    //     console.log(res);
    //   });
  }
  successfulPurchaseCallback(){
    this.props.history.push('/');
    window.Materialize.toast('Thank you for your purchase.');
  }
  //auto fill state field

  render() {
    // console.log(this.props);
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div>
          <label className="checkout-label">
            Personal Info
            <Field
              type="text"
              name="name"
              label="Name"
              component={renderField}
            />
          </label>
        </div>
        <div>
          <label className="checkout-label">
            Address details
            <Field
              component={renderField}
              type="text"
              label="Address"
              name="address"
            />
            <Field
              component={renderField}
              type="text"
              label="City"
              name="city"
            />
            <Field
              component={renderField}
              type="text"
              label="State"
              name="state"
            />
            <Field
              component={renderField}
              type="text"
              label="Country"
              name="country"
            />
            <Field
              component={renderField}
              type="number"
              label="ZIP"
              name="zip"
            />
          </label>
        </div>
        <div>
          {' '}
          <CardSection />
        </div>

        <Button>Confirm order</Button>
        {/* <PaymentRequestButton /> */}
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be atleast 3 characters long';
  }

  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.city) {
    errors.city = 'Required';
  }
  if (!values.state) {
    errors.state = 'Required';
  }

  if (!values.country) {
    errors.country = 'Required';
  }

  if (!values.zip) {
    errors.zip = 'Required';
  }

  return errors;
};

function mapStateToProps({ form, error }) {
  return { form, error };
}

export default reduxForm({
  form: 'checkout',
  validate
})(
  connect(
    mapStateToProps,
    actions
  )(injectStripe(CheckoutForm))
);
