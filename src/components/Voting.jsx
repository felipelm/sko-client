import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Winner from './Winner';
import Vote from './Vote';

export default React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
  render: function(){
    return <div>
    {this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <Vote pair={this.props.pair} hasVoted={this.props.hasVoted} />}
      </div>;
  }
});
