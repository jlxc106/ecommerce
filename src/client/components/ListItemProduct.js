import React, { Component } from 'react';
import {
  Collapsible,
  CollapsibleItem,
  Button,
  Carousel
} from 'react-materialize';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../actions';

class ListItemProduct extends Component {
  constructor(props) {
    super(props);
  }
  renderProductInfo() {
    if (!this.props.item) {
      return <div />;
    }

    let imageLink = '';
    const {
      description,
      imageUrl,
      name,
      price,
      quantity,
      _id
    } = this.props.item;
    if (imageUrl.length > 0 && imageUrl[0].length > 0) {
      imageLink = `${process.env.AWS_S3_BASE_URL}${imageUrl[0]}`;
    }

    return (
      <div>
        {imageLink ? (
          <img className="image-product-collapsible" src={imageLink} />
        ) : null}
        <p>Description: {description}</p>
        <hr />
        <p>
          price: {price}{' '}
          <Link
            to={{
              pathname: `/editProduct/${_id}`,
              state: {
                product: this.props.item
              }
            }}
          >
            <Button
              disabled={true}
              className="red button-edit-collapsible"
              large
              floating
            >
              Edit
            </Button>
          </Link>
        </p>
        <p>quantity: {quantity}</p>
      </div>
    );
  }

  render() {
    return (
      <CollapsibleItem onSelect={() => {}} header={this.props.item.name}>
        {this.renderProductInfo()}
      </CollapsibleItem>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

export default connect(
  mapStateToProps,
  actions
)(ListItemProduct);
