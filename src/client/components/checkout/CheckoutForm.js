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
    this.successfulPurchaseCallback = this.successfulPurchaseCallback.bind(
      this
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.props.form.checkout.syncErrors) {
      const purchaseQuantity = this.props.purchaseQuantity;
      const { description, name, price, quantity, _id } = this.props.product;
      const { customerName } = this.props.form.checkout.values;
      let response = await this.props.stripe.createToken({
        name: customerName
      });
      let token = response.token;
      token = {
        ...token,
        purchaseQuantity,
        description,
        name,
        quantity,
        price,
        productId: _id
      };
      this.props.handleToken(
        token,
        this.successfulPurchaseCallback,
        this.errorCallback
      );
    }
  }

  successfulPurchaseCallback() {
    this.props.history.push('/');
    window.Materialize.toast('Thank you for your purchase.', 1000);
  }

  errorCallback(message) {
    window.Materialize.toast(message, 1000);
  }

  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <label className="checkout-label">Personal Info</label>
        <Field
          type="text"
          name="name"
          label="Name"
          component={renderField}
          autoFocus={true}
        />
        <label className="checkout-label">Address details</label>
        {/* <Autocomplete
          style={{ width: '90%' }}
          onPlaceSelected={place => {
            console.log(place);
          }}
          types={['(regions)']}
          componentRestrictions={{ country: 'us' }}
        /> */}
        <Field
          component={renderField}
          type="text"
          label="Address"
          name="address"
        />
        <Field component={renderField} type="text" label="City" name="city" />
        <Field component={renderField} type="text" label="State" name="state" />
        <Field
          component={renderField}
          type="text"
          label="Country"
          name="country"
        />
        <Field component={renderField} type="number" label="ZIP" name="zip" />
        <div className="container-card-checkout">
          {' '}
          <CardSection />
        </div>
        <Button>Confirm order</Button>
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
  } else if (values.zip < 10000) {
    errors.zip = 'Invalid zip code';
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
