import {TYPES} from '../actions/ui';

const initialState = {
  filtersOut: true
};

export const ui = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.TOGGLE_FILTERS:
      return {
        ...state,
        filtersOut: payload
      };

    default:
      return state;
  }
};