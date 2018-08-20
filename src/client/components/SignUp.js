import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import validator from 'email-validator';
import { Link } from 'react-router-dom';

import * as actions from '../actions/index';
import { renderField } from '../helpers/renderField';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealPassword: false
    };
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { name, email, password } = this.props.form.SignUp.values;

    this.props.handleSignUpFormSubmit(
      {
        name,
        email,
        password
      },
      this.props.history
    );
  }

  renderSignUpError() {
    if (!_.isEmpty(this.props.error)) {
      const { message, type } = this.props.error;
      if (type === 'sign_up_error') {
        return <h3>{message}</h3>;
      }
    }
    return null;
  }

  togglePassword() {
    const toggledState = !this.state.revealPassword;
    this.setState(
      {
        revealPassword: toggledState
      });
  }

  render() {
    return (
      <div className="div-horizontal-margin">
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={e => this.handleFormSubmit(e)}>
          <Field name="name" type="text" component={renderField} label="name" />
          <Field
            name="email"
            label="Email"
            component={renderField}
            type="text"
          />
          <Field
            name="password"
            label="Password"
            component={renderField}
            type="password"
          />
          <Field
            name="checkPassword"
            label="Re-enter password"
            component={renderField}
            type={
              this.state.revealPassword &&
              this.props.form.SignUp.active === 'checkPassword'
                ? 'text'
                : 'password'
            }
          />
          <input
            id="oink"
            type="checkbox"
            className="filled-in"
            checked={this.state.revealPassword ? true : false}
            onChange={() => this.togglePassword()}
          />
          <label htmlFor="oink">Reveal Password</label>
          <br />
          <br />
          <div>
            <button onClick={e => this.handleFormSubmit(e)}>Submit</button>
          </div>
        </form>
        {this.renderSignUpError()}
        <Link to="signIn">Already have an account? Sign In Here</Link>
      </div>
    );
  }
}

function mapStateToProps({ form, error }) {
  return { form, error };
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 3) {
    errors.name = 'Name must be atleast 3 characters long';
  }

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

  if (!values.checkPassword) {
    errors.checkPassword = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'SignUp',
  validate
})(
  connect(
    mapStateToProps,
    actions
  )(SignUp)
);
