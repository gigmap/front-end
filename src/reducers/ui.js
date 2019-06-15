import {TYPES} from '../actions/ui';
import {SORTING} from '../components/concerts/sorting/Constants';

const initialState = {
  filtersOut: true,
  locationDialogOpen: false,
  sorting: SORTING.date
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

    case TYPES.SORT_BY:
      if (!Object.values(SORTING).includes(payload)) {
        return  state;
      }

      return {
        ...state,
        sorting: payload
      };

    default:
      return state;
  }
};