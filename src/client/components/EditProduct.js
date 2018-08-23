import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Collapsible, CollapsibleItem, Button } from 'react-materialize';
import { connect } from 'react-redux';

import FieldFileInput from './FileInput';
import { renderField } from '../helpers/renderField';
import * as actions from '../actions';

class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null
    };
  }

  handleSubmitProductEdit(e) {
    e.preventDefault();
  }

  fileInputOnChange(file) {
    this.setState({ file});
  }

  render() {
    console.log(this.state.file);
    console.log(this.props.location.state.product);
    return (
      <div className="div-horizontal-margin">
        <h5>Edit Product</h5>
        <div />
        <form onSubmit={e => this.handleSubmitProductEdit(e)}>
          <Field
            component={renderField}
            name="name"
            label="Product name"
            type="text"
          />
          <Field
            component={renderField}
            name="price"
            label="price"
            type="text"
            normalize={normalizePrice}
          />
          <Field
            component={renderField}
            name="quantity"
            label="quantity"
            normalize={normalizeQuantity}
            type="text"
          />
          <Field
            component={renderField}
            name="description"
            label="description of product"
            type="text"
          />
          <FieldFileInput
            // multiple={true}
            onChange={this.fileInputOnChange.bind(this)}
          />
          <br />
          <br />
          <Button
            className="blue"
            onClick={e => this.handleSubmitProductEdit(e)}
          >
            Edit Product
          </Button>
        </form>
      </div>
    );
  }
}

const normalizePrice = value => {
  if (!value) {
    return value;
  }
  const normalizedValue = value.replace(/[^\d]/g, '');
  if (normalizedValue.length > 2) {
    const dollarPosition = normalizedValue.length - 2;
    return `$ ${normalizedValue.slice(
      0,
      dollarPosition
    )}.${normalizedValue.slice(-2)}`;
  } else {
    return `$ .${normalizedValue}`;
  }
};

const normalizeQuantity = value => {
  const normalizedValue = value.replace(/[^\d]/g, '');
  return normalizedValue;
};

function mapStateToProps(state) {
  return { state };
}

const validate = values => {
  const errors = {};
  // let formattedPrice;
  // if (!values.name) {
  //   errors.name = 'Required';
  // }

  // if (!values.description) {
  //   errors.description = 'Required';
  // }

  // if (values.price) {
  //   formattedPrice = parseFloat(values.price.substring(2));
  // }
  // if (!values.price || values.price === '$ .') {
  //   errors.price = 'Required';
  // } else if (
  //   values.price <= 0 ||
  //   formattedPrice === 0 ||
  //   formattedPrice === NaN
  // ) {
  //   errors.price = 'Invalid price';
  // } else if (formattedPrice > 100) {
  //   errors.price = '$100 maximum';
  // }

  // if (!values.quantity) {
  //   errors.quantity = 'Required';
  // } else if (values.quantity <= 0) {
  //   errors.quantity = 'Invalid quantity';
  // }

  return errors;
};

export default reduxForm({
  form: 'EditProduct',
  validate
})(
  connect(
    mapStateToProps,
    actions
  )(EditProduct)
);

// if (this.state.editMode) {
//   return (
//     <div>
//       <form onSubmit={e => this.handleSubmit(e)}>
//         <Field
//           component={renderField}
//           name="name"
//           label="Product name"
//           type="text"
//         />
//         <Field
//           component={renderField}
//           name="price"
//           label="price"
//           type="text"
//           normalize={normalizePrice}
//         />
//         <Field
//           component={renderField}
//           name="quantity"
//           label="quantity"
//           normalize={normalizeQuantity}
//           type="text"
//         />
//         <Field
//           component={renderField}
//           name="description"
//           label="description of product"
//           type="text"
//         />
//         {/* <FieldFileInput onChange={this.fileInputOnChange.bind(this)} /> */}
//         <br />
//         <br />
//         <Button
//           className="blue"
//           onClick={e => this.handleProductRegister(e)}
//         >
//           Register Product
//         </Button>
//       </form>
//     </div>
//   );
// }
