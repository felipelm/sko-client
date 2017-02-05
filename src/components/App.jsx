import React from 'react';

require('../style.css');

export default React.createClass({
  render: function(){
    return this.props.children;
  }
});
