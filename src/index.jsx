import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['McDonalds', 'Bobs'];

ReactDOM.render(
  <Voting pair={pair} winner="McDonalds" />,
  document.getElementById('app')
);