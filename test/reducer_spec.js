import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', ()=> {
  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('McDonalds', 'Bobs'),
          score: Map({McDonalds: 1})
        })
      })
    };

    const nextState = reducer(initialState,action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['McDonalds', 'Bobs'],
        score: {McDonalds:1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type:'SET_STATE',
      state: {
        vote: {
          pair: ['McDonalds', 'Bobs'],
          score: {McDonalds: 1}
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['McDonalds', 'Bobs'],
        score: {McDonalds: 1}
      }
    }));
  });

  it('handles SET_STATE undefined', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['McDonalds', 'Bobs'],
          score: {McDonalds: 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['McDonalds','Bobs'],
        score: {McDonalds: 1}
      }
    }));
  });

  it('handles VOTE by settting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Vienna', 'Bobs'],
        score: {Vienna:1}
      }
    });
    const action = {type: 'VOTE', entry: 'Vienna'};
    const nextState = reducer(state,action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Vienna', 'Bobs'],
        score: {Vienna: 1}
      },
      hasVoted: 'Vienna'
    }));
  });

  it('does not set hasVoted for invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Vienna', 'Bobs'],
        score: {Vienna:1}
      }
    });
    const action = {type: 'VOTE', entry: 'McDonalds'};
    const nextState = reducer(state,action);

    expect(nextState).to.equal(fromJS({
      vote:{
        pair: ['Vienna', 'Bobs'],
        score: {Vienna: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Vienna', 'Bobs'],
        score: {Vienna:1}
      },
      hasVoted: 'Vienna'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['McDonalds', 'Spoletto']
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['McDonalds', 'Spoletto']
      }
    }));
  });

});
