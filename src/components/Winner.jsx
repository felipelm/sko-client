import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';



export default React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
  render: function(){
    return <div className="winner">
        Winner is {this.props.winner}!
        </div>
  }
});
