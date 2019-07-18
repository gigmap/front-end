// @flow
import {TYPES as USER_TYPES} from '../actions/user';

export const initReducer = (
  initialState: Object,
  actions: { [string]: Function },
  resetOnLogout = true) => {

  if (resetOnLogout) {
    actions = {
      ...actions,
      [USER_TYPES.LOGOUT]: () => ({...initialState})
    }
  }

  return (state = initialState, {type, ...action}) => {
    if (actions[type]) {
      return actions[type](state, action);
    }

    return state;
  };
};