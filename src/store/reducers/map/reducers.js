import {initReducer} from '../initReducer';
import {TYPES} from './actions';

export const INITIAL_MAP_POSITION = {
  center: [54, 16.5],
  zoom: 4
}

const initialState = {
  shownGigIds: [],
  shownGigsPopupOpen: false,
  ...INITIAL_MAP_POSITION
};

export const map = initReducer(initialState, {
  [TYPES.SET_SHOWN]: (state, {payload}) => ({
    ...state,
    shownGigIds: payload
  }),

  [TYPES.TOGGLE_POPUP]: (state, {payload}) => ({
    ...state,
    shownGigsPopupOpen: payload
  }),

  [TYPES.SET_POSITION]: (state, {payload}) => ({
    ...state,
    ...payload
  })
});