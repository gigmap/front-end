// @flow

import {TYPES} from '../actions/user';

// TODO: use where applicable
export const makeReducer = (
  initialState: Object,
  actions: { [string]: Function },
  resetOnLogout: boolean = true) => {

  if (resetOnLogout) {
    actions = {
      ...actions,
      [TYPES.LOGOUT]: () => ({...initialState})
    };
  }

  return (state: {} = initialState, {type, ...action}: any) => {
    if (actions[type]) {
      return actions[type](state, action);
    }

    return state;
  };
};