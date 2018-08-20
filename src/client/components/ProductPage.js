import React, { Component } from 'react';

class ProductPage extends Component {
  constructor(props) {
    super(props);
  }



  render() {
    console.log(this.props.location.state);
    return (
      <div className="home-div div-horizontal-margin">
        product page here oink
      </div>
    );
  }
}

export default ProductPage;
