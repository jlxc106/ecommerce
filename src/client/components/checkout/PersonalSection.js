import React, { Component } from 'react';
// import { CardElement } from 'react-stripe-elements';

class PersonalSection extends Component {
  
  
  updateName(e){
      console.log(e);
    //   this.props.name = e.target.value;
  }
  
  
    render() {
    var name = this.props.name;
    return (
      <label>
        Personal Info
        <input
          type="text"
          value=""
        //   value={name}
          placeholder="Name"
          onChange={(e) => this.updateName(e)}
        />
        {/* <input type="text" placeholder="Email" /> */}
        {/* <input type="text" placeholder="Phone" /> */}
        {/* <input type="text" placeholder="ZIP" /> */}
        {/* <CardElement style={{ base: { fontSize: '18px' } }} /> */}
      </label>
    );
  }
}

export default PersonalSection;
