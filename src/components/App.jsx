import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('McDonalds', 'Bobs');
const score = Map({'McDonalds': 3, 'Bobs': 2});

export default React.createClass({
  render: function(){
    return React.cloneElement(this.props.children, {
      pair: pair,
      score: score
    });
  }
});
