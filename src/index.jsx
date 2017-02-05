import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';

const pair = ['McDonalds', 'Bobs'];

const routes = <Route component={App}>
  <Route path="/" component={Voting} />
</Route>;

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
