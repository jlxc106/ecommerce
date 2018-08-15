import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';

class SignUp extends Component {
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

  renderSignInError(){
    if (!_.isEmpty(this.props.error)) {
        const {message, type} = this.props.error;
        if(type === 'sign_up_error'){
            return <h3>{message}</h3>
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
            {/* <Label /> */}
          <Field name="email" component="input" type="text" />
          {/* <Label /> */}
          <Field name="password" component="input" type="password" />
          <button onClick={e => this.handleFormSubmit(e)}>Submit</button>
        </form>
        {this.renderSignInError()}
      </div>
    );
  }
}

function mapStateToProps({ form, error }) {
  return { form, error };
}

const validate = value =>{
    
}

// const warn = () =>{

// }


export default reduxForm({
  form: 'SignUp',
  validate,
//   warn
})(
  connect(
    mapStateToProps,
    actions
  )(SignUp)
);
