import {TYPES} from '../../actions/filters';
import {
  ARTISTS_DATA_KEY as ARTISTS,
  COUNTRIES_DATA_KEY as COUNTRIES
} from '../Constants';
import {initReducer} from '../initReducer';

const initialState = {
  [COUNTRIES]: {},
  [ARTISTS]: {}
};

export const selected = initReducer(initialState, {

  [TYPES.TOGGLE]: (state, {payload, meta}) => ({
    ...state,
    [meta.name]: {
      ...state[meta.name],
      [meta.itemId]: payload
    }
  }),

  [TYPES.TOGGLE_ALL]: (state, {payload, meta}) => ({
    ...state,
    [meta.name]: payload
  })
});