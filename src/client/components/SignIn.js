import React, { Component } from 'react';
import { reduxForm, Field, Label } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import validator from 'email-validator';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';

import { renderField } from '../helpers/renderField';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const { email, password } = this.props.form.signIn.values;

    this.props.handleFormSubmit(
      {
        email,
        password
      },
      this.props.history
    );
  }

  renderSignInError() {
    if (!_.isEmpty(this.props.error)) {
      const { message, type } = this.props.error;
      if (type === 'sign_in_error') {
        return <h3>{message}</h3>;
      }
    }
    return null;
  }

  render() {
    // const { handleFormSubmit } = this.props;
    console.log(this.props);

    return (
      <div>
        <h1>Sign In</h1>
        <hr />
        <form onSubmit={e => this.handleFormSubmit(e)}>
          {/* <label>email</label> */}
          <Field
            component={renderField}
            name="email"
            label="email"
            // component="input"
            type="text"
          />
          {/* <label>password</label> */}
          <Field
            component={renderField}
            name="password"
            label="password"
            // component="input"
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
  }
//   } else if (values.password.length < 8) {
//     errors.password = 'Must be 8 characters or more';
//   }
   else if (
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

// const warn = value =>{

// }

export default reduxForm({
  form: 'signIn',
  validate
  //   warn
})(
  connect(
    mapStateToProps,
    actions
  )(SignIn)
);
