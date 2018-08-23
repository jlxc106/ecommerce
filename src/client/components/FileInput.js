import React, { Component } from 'react';

export default class FieldFileInput extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    for(var i=0; i<e.target.files.length; i++){
      if(e.target.files[i].type === "image/png"){
       window.Materialize.toast('jpeg file types only', 1000);
      }
    }
    console.log(e.target.files);
    this.props.onChange(e.target.files);
  }

  render() {
    // var enabledMultiple = this.props.multiple || false;
    // const { input: { value } } = this.props
    // const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return (
      <div>
        <label>Add Image</label>
        <div>
          <input
            type="file"
            accept="image/*"
            multiple={true}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}
