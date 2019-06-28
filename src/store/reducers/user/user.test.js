import {TYPES} from '../../actions/user';
import {user, initialState} from './user';
import {makeAction} from '../../actions/lib';

describe('user reducer', function () {

  it('should return initial state', function () {
    expect(user(undefined, {})).toStrictEqual({...initialState});
  });

  it('should return initial state on logout', () => {
    expect(user({some: 'state'}, makeAction(TYPES.LOGOUT)))
      .toStrictEqual({...initialState});
  });

  it('should unset location', () => {
    const state = {some: 'state', location: {lat: 1, lng: 2}};
    expect(user(state, makeAction(TYPES.SET_LOCATION, null)))
      .toStrictEqual({some: 'state', location: null});
  });

  it('should save location', () => {
    const state = {some: 'state', location: {lat: 1, lng: 2}};

    expect(user(state, makeAction(TYPES.SET_LOCATION, {lat: 3, lng: 4})))
      .toStrictEqual({some: 'state', location: {lat: 3, lng: 4}});
  });
});