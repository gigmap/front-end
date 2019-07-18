import {initReducer} from '../initReducer';
import {TYPES} from '../../actions/map';

const initialState = {
  shownGigIds: [],
  shownGigsPopupOpen: false
};

export const map = initReducer(initialState, {
  [TYPES.SET_SHOWN]: (state, {payload}) => ({
    ...state,
    shownGigIds: payload
  }),

  [TYPES.TOGGLE_POPUP]: (state, {payload}) => ({
    ...state,
    shownGigsPopupOpen: payload
  })
});