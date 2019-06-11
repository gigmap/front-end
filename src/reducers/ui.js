import {TYPES} from '../actions/ui';

const initialState = {
  filtersOut: true,
  locationDialogOpen: false
};

export const ui = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.TOGGLE_FILTERS:
      return {
        ...state,
        filtersOut: payload
      };

    case TYPES.TOGGLE_LOCATION:
      return {
        ...state,
        locationDialogOpen: payload
      };

    default:
      return state;
  }
};