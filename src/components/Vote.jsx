import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';



export default React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  },
  getPair: function(){
    return this.props.pair || [];
  },
  isDisabled: function(){
    return this.props.hasVoted;
  },
  hasVotedFor: function(entry){
    return this.props.hasVoted === entry;
  },
  render: function(){
    return <div className="voting">
    {
      this.getPair().map(entry =>
      <button key={entry}
              disabled={this.isDisabled()}
              onClick={() => this.props.vote(entry)}>
        <h1>{entry}</h1>
        {this.hasVotedFor(entry) ?
          <div className='label'>Voted</div> : null}
      </button>
    )}
    </div>;
  }
});
