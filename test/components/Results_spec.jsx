import React from 'react';
import ReactDOM from 'react-dom';
import{
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
}from 'react-addons-test-utils';
import{List,Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {
  it('renders entries vote counts or zero', () => {
    const pair = List.of('McDonalds', 'Bobs');
    const score = Map({'McDonalds': 3});
    const component = renderIntoDocument(
      <Results pair={pair} score={score} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [mcdo,bobs] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(mcdo).to.contain('McDonalds');
    expect(mcdo).to.contain(3);
    expect(bobs).to.contain('Bobs');
    expect(bobs).to.contain('0');

  });

  it('invokes next callback when button next is clicked', ()=>{
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('McDonalds', 'Bobs');
    const component = renderIntoDocument(
      <Results pair={pair}
              score={Map()}
              next={next}/>
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('renders winner', () => {
    const component = renderIntoDocument(
      <Results winner="McDonalds"
                pair={["McDonalds", "Bobs"]}
                score={Map()} />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('McDonalds');
  })
});
