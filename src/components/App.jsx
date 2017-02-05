import React from 'react';
import {List} from 'immutable';

const pair = List.of('McDonalds', 'Bobs');

export default React.createClass({
  render: funtion(){
    return React.cloneElement(tis.props.children, {pair: pair});
  }
});
