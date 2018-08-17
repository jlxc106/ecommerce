import React, { Component } from 'react';
import { Collapsible, CollapsibleItem, Button } from 'react-materialize';

class ListItemProduct extends Component {
  constructor(props) {
    super(props);
  }

  handleEditItem(e){
    e.preventDefault();

    
  }


  renderProductInfo() {
    if (!this.props.item) {
      return <div />;
    }
    let imageLink = '';
    const { description, imageUrl, name, price, quantity } = this.props.item;
    if(imageUrl.length > 0){
         imageLink = `https://jlxc106-ecommerce-123.s3.us-west-1.amazonaws.com/${imageUrl}`;
    }
    return (
      <div>
        <img className="image-product-collapsible" src={imageLink} />
        <p>Description: {description}</p>
        <hr />
        <p>price: {price} <Button onClick={(e)=>this.handleEditItem(e)}className="red button-edit-collapsible" large floating>Edit</Button></p>
        <p>quantity: {quantity}</p>
      </div>
    );
  }

  render() {
    console.log(this.props.item);
    return (
      <CollapsibleItem header={this.props.item.name} onSelect={() => {}}>
        {this.renderProductInfo()}
      </CollapsibleItem>
    );
  }
}

export default ListItemProduct;
