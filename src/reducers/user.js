import {TYPES} from '../actions/user';

const initialState = {
  name: null,
  artistQty: 0,
  location: null
};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.LOGIN:
      return {
        ...state,
        name: payload.username,
        artistQty: payload.artistQty
      };

    case TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};