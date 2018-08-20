import React, {Component} from 'react'

export default class FieldFileInput  extends Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.props.onChange(e.target.files[0])
  }

  render(){
    // const { input: { value } } = this.props
    // const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
     <div><label>Add Image</label>
     <div>
       <input
       type="file"
       accept="image/*"
        onChange={this.onChange}
       />
     </div>
     </div>
    )
}
}