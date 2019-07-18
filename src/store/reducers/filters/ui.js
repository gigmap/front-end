import {TYPES} from '../../actions/filters';
import {
  ARTISTS_DATA_KEY as ARTISTS,
  COUNTRIES_DATA_KEY as COUNTRIES
} from '../Constants';
import {initReducer} from '../initReducer';

const initialState = {
    dialogShown: {
      [COUNTRIES]: false,
      [ARTISTS]: false
  }
};

export const ui = initReducer(initialState, {
  [TYPES.TOGGLE_DIALOG]: (state, {payload, meta}) => ({
    ...state,
    dialogShown: {
      ...initialState.dialogShown,
      [meta.dataKey]: payload
    }
  })
});