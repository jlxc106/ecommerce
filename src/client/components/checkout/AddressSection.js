import React, { Component } from 'react';

class AddressSection extends Component {
  render() {
    return (
      <label>
        Address details
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="State" />
        <input type="text" placeholder="ZIP" />
        {/* <CardElement style={{ base: { fontSize: '18px' } }} /> */}
      </label>
    );
  }
}

export default AddressSection;
