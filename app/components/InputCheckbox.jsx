import React from 'react'

var createReactClass = require('create-react-class');

var InputCheckbox = createReactClass({
  getDefaultProps: function () {
    return {
      checked: false
    }
  },
  render: function () {
    return (
    <input className="selectchkbox"
           checked={this.props.checked}
           type='checkbox'
           {...this.props}/>
    )
  }
});

export default InputCheckbox;