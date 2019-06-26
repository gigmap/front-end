import {TYPES} from '../../actions/user';

export const initialState = {
  name: null,
  artistQty: 0,
  location: null,
  dates: null
};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.LOGIN:
      return {
        ...state,
        name: payload.username,
        artistQty: payload.artistQty
      };

    case TYPES.SET_LOCATION:
      return {
        ...state,
        location: payload ? {...payload} : null
      };


    case TYPES.SET_DATES:
      return {
        ...state,
        dates: Array.isArray(payload) && payload.length === 2 ?
          {from: payload[0], to: payload[1]} :
          null
      };

    case TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};