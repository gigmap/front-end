import {CHANGE} from 'redux-form/lib/actionTypes';
import {TYPES} from '../../actions/user';
import {
  COUNTRY_FILTER_NAME as COUNTRIES,
  ARTIST_FILTER_NAME as ARTISTS
} from '../../../components/filters/Constants';
import {omit} from 'lodash';

const initialState = {
  unsetCountries: {},
  unsetArtists: {}
};

const PROPS = {
  [COUNTRIES]: 'unsetCountries',
  [ARTISTS]: 'unsetArtists'
};

export const filters = (state = initialState, {type, payload, meta}) => {
  switch (type) {
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

    case TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};