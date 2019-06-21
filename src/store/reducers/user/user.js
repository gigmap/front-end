import {TYPES} from '../../actions/user';

export const initialState = {
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

    case TYPES.SET_LOCATION:
      return {
        ...state,
        location: payload ? {...payload} : null
      };

    case TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};