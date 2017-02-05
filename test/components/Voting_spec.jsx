import React from 'react';
import ReactDOM from 'react-dom';
import{
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
}from 'react-addons-test-utils';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', ()=> {

  it('render a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["McDonalds", "Bobs"]} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('McDonalds');
    expect(buttons[1].textContent).to.equal('Bobs');
  });

  it('invoke callback when button clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["McDonalds", "Bobs"]} vote={vote}/>
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('McDonalds');
  });

  it('disable buttons when voted', () => {
    const component = renderIntoDocument(
      <Voting pair={["McDonalds", "Bobs"]}
              hasVoted="McDonalds" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.equal(true);
    expect(buttons[1].hasAttribute('disabled')).to.equal(true);
  });

  it('adds label to voted entry', () => {
    const component = renderIntoDocument(
      <Voting pair={["McDonalds", "Bobs"]}
              hasVoted="McDonalds" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons[0].textContent).to.contain('Voted');

  });

  it('renders winner', () => {
    const component = renderIntoDocument(
      <Voting winner="McDonalds" />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('McDonalds');
  });

  it('renders as pure component', ()=>{
    const pair = ['McDonalds', 'Bobs'];
    const container = document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0];
    expect(firstButton.textContent).to.equal('McDonalds');
  });

  it('updates DOM when prop change', ()=>{
    const pair = List.of('McDonalds', 'Bobs');
    const container =  document.createElement('div');
    let component = ReactDOM.render(
      <Voting pair={pair} />,
      container
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0];
    expect(firstButton.textContent).to.equal('McDonalds');

    const newPair = pair.set(0,'Subway');
    component = ReactDOM.render(
      <Voting pair={newPair} />,
      container
    )

    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Subway');
  });
});
