import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Winner from './Winner';
import Vote from './Vote';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
  render: function(){
    return <div>
    {this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <Vote {...this.props} />}
      </div>;
  }
});

function mapStateToProps(state){
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
