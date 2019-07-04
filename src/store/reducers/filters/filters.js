import {TYPES as USER_TYPES} from '../../actions/user';
import {TYPES} from '../../actions/filters';
import {
  ARTISTS_DATA_KEY as ARTISTS,
  COUNTRIES_DATA_KEY as COUNTRIES
} from '../Constants';

const initialState = {
  selected: {
    [COUNTRIES]: {},
    [ARTISTS]: {}
  },

  search: {
    [COUNTRIES]: '',
    [ARTISTS]: ''
  }
};

export const filters = (state = initialState, {type, payload, meta}) => {
  switch (type) {

    case TYPES.TOGGLE:
      return {
        ...state,
        selected: {
          ...state.selected,
          [meta.name]: {
            ...state.selected[meta.name],
            [meta.itemId]: payload
          }
        }
      };

    case TYPES.TOGGLE_ALL:
      return {
        ...state,
        selected: {
          ...state.selected,
          [meta.name]: payload
        }
      };

    case TYPES.SEARCH:
      if (meta.name !== COUNTRIES && meta.name !== ARTISTS) {
        return state;
      }

      return {
        ...state,
        search: {
          ...state.search,
          [meta.name]: payload
        }
      };

    case USER_TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};