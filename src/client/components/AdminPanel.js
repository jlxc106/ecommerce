import React, { Component } from 'react';
import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { reduxForm, Field } from 'redux-form';

import ListProduct from './ListProduct';
import * as actions from '../actions/index';
import { renderField } from '../helpers/renderField';
import FieldFileInput from './FileInput';

ReactModal.setAppElement('#app');

class AdminPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   editMode: false,
      openModal: false,
      file: null
    };
  }

  componentWillMount() {
    this.props.getUserProducts();
  }

  //   enableEdit() {
  //     this.setState(
  //       {
  //         editMode: true
  //       },
  //       () => console.log(this.state.editMode)
  //     );
  //   }

  openProductModal() {
    //trigger a modal
    this.setState({
      openModal: true
    });
  }

  closeProductModal() {
    this.setState({
      openModal: false
    });
  }

  getModalParent() {
    return document.querySelector('#admin-div');
  }

  fileInputOnChange(file) {
    this.setState({ file });
  }

  handleProductEdit(num){
    console.log();
  }

  handleProductRegister(e) {
    e.preventDefault();
    if (this.props.form.registerProduct.syncErrors) {
      return;
    }

    const {
      name,
      description,
      price,
      quantity
    } = this.props.form.registerProduct.values;

    const priceInCents = parseFloat(price.substring(2)) * 100;

    const { file } = this.state;
    this.props.createProduct(
      {
        name,
        description,
        price: priceInCents,
        quantity
      },
      file,
      () => {
        this.closeProductModal();
      }
    );
  }

  render() {
    const { product } = this.props;
    console.log(product);
    console.log(this.state);
    return (
      <div className="div-horizontal-margin" id="admin-div">
        <h1>Admin Panel</h1>
        <hr />
        <div>
          <h5>Your Products</h5>
        </div>
        <hr />
        <ListProduct callback={this.handleProductEdit}/>
        {/* <Button className="orange" onClick={() => this.enableEdit()}>
          Edit
        </Button> */}
        <hr />
        <Button className="green" onClick={() => this.openProductModal()}>
          Register New Product
          <Icon left>add</Icon>
        </Button>
        <ReactModal
          isOpen={this.state.openModal}
          parentSelector={this.getModalParent}
          contentLabel="some modal example"
          closeTimeoutMS={150}
          shouldCloseOnEsc={true}
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => this.closeProductModal()}
        >
          <Button
            className="red btn-padding"
            onClick={() => this.closeProductModal()}
          >
            <Icon>close</Icon>
          </Button>
          <form onSubmit={e => this.handleProductRegister(e)}>
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
            <FieldFileInput onChange={this.fileInputOnChange.bind(this)} />
            <br />
            <br />
            <Button
              className="blue"
              onClick={e => this.handleProductRegister(e)}
            >
              Register Product
            </Button>
          </form>
        </ReactModal>
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

function mapStateToProps({ auth, form, product, error }) {
  return { auth, form, product, error };
}

const validate = values => {
  const errors = {};
  let formattedPrice;
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.description) {
    errors.description = 'Required';
  }

  if (values.price) {
    formattedPrice = parseFloat(values.price.substring(2));
  }
  if (!values.price || values.price === '$ .') {
    errors.price = 'Required';
  } else if (
    values.price <= 0 ||
    formattedPrice === 0 ||
    formattedPrice === NaN
  ) {
    errors.price = 'Invalid price';
  } else if (formattedPrice > 100) {
    errors.price = '$100 maximum';
  }

  if (!values.quantity) {
    errors.quantity = 'Required';
  } else if (values.quantity <= 0) {
    errors.quantity = 'Invalid quantity';
  }

  return errors;
};

export default reduxForm({
  form: 'registerProduct',
  validate
})(
  connect(
    mapStateToProps,
    actions
  )(AdminPanel)
);
