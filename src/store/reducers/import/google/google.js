// @flow

import {TYPES} from '../../../actions/import';
import {makeReducer} from '../../lib';
import {mapImportEntries} from './mapper';

const initialState = {
  items: null,
  loading: false,
  error: null
};

export const google = makeReducer(initialState, {
  [TYPES.RESET_GOOGLE]: () => ({...initialState}),
  [TYPES.IMPORT_GOOGLE.START]: (state) => ({
    ...state,
    loading: true,
    error: null
  }),
  [TYPES.IMPORT_GOOGLE.FAILED]: (state, {payload}) => ({
    ...state,
    loading: false,
    error: payload.message
  }),
  [TYPES.IMPORT_GOOGLE.SUCCESS]: (state, {payload}) => ({
    ...state,
    items: mapImportEntries(payload),
    loading: false
  })
});