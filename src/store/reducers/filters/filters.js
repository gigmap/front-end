import {CHANGE} from 'redux-form/lib/actionTypes';
import {TYPES as USER_TYPES} from '../../actions/user';
import {TYPES} from '../../actions/filters';
import {
  COUNTRY_FILTER_NAME as COUNTRIES,
  ARTIST_FILTER_NAME as ARTISTS
} from '../../../components/_old/filters/Constants';
import {omit} from 'lodash';

const initialState = {
  unsetCountries: {},
  unsetArtists: {},

  selected: {
    [COUNTRIES]: {},
    [ARTISTS]: {}
  },

  search: {
    [COUNTRIES]: '',
    [ARTISTS]: ''
  }
};

const PROPS = {
  [COUNTRIES]: 'unsetCountries',
  [ARTISTS]: 'unsetArtists'
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

    case CHANGE:
      const propName = PROPS[meta.form];
      if (!propName) {
        return state;
      }

      const newValue = payload ?
        omit(state[propName], meta.field) :
        {...state[propName], [meta.field]: true};

      return {
        ...state,
        [propName]: newValue
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