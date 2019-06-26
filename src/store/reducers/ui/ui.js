import {TYPES} from '../../actions/ui';
import {SORTING} from '../../../components/concerts/sorting/Constants';

export const initialState = {
  filtersOut: true,
  locationDialogOpen: false,
  dateDialogOpen: false,
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

    case TYPES.TOGGLE_DATES:
      return {
        ...state,
        dateDialogOpen: payload
      };

    case TYPES.SORT_BY:
      if (payload === state.sorting ||
        !Object.values(SORTING).includes(payload)) {
        return state;
      }

      return {
        ...state,
        sorting: payload
      };

    default:
      return state;
  }
};