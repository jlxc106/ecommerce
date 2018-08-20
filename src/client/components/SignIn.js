import React, { Component } from 'react';
import { reduxForm, Field, Label } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import validator from 'email-validator';
import { Link } from 'react-router-dom';

import * as actions from '../actions/index';
import { renderField } from '../helpers/renderField';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (!this.props.form.signIn.syncErrors) {
      const { email, password } = this.props.form.signIn.values;
      this.props.handleSignInFormSubmit(
        {
          email,
          password
        },
        this.props.history
      );
    }
  }

  renderSignInError() {
    if (!_.isEmpty(this.props.error)) {
      const { message, type } = this.props.error;
      if (type === 'sign_in_error') {
        return <h3 className="text-red">{message}</h3>;
      }
    }
    return null;
  }

  render() {
    return (
      <div className="div-horizontal-margin">
        <h1>Sign In</h1>
        <hr />
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <Field
            component={renderField}
            name="email"
            label="email"
            type="text"
          />
          <Field
            component={renderField}
            name="password"
            label="password"
            type="password"
          />
          <button onClick={e => this.handleFormSubmit(e)}>Submit</button>
        </form>
        {this.renderSignInError()}
        <hr />
        <Link to="signUp">SIGN UP HERE</Link>
      </div>
    );
  }
}

function mapStateToProps({ form, error }) {
  return { form, error };
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!validator.validate(values.email)) {
    errors.email = 'invalid email';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (
    !values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ) {
    errors.password = [
      'Must contain:',
      'atleast 8 characters or more',
      'atleast 1 lowercase letter',
      'atleast 1 uppercase letter',
      'atleast 1 number'
    ];
  }
  return errors;
};

export default reduxForm({
  form: 'signIn',
  validate
})(
  connect(
    mapStateToProps,
    actions
  )(SignIn)
);
