import {TYPES} from '../../actions/ui';
import {initReducer} from '../initReducer';

const initialState = {
  sidebarShown: false
};

export const mobile = initReducer(initialState, {
  [TYPES.TOGGLE_MOBILE_SIDEBAR]: (state, {payload, meta}) => ({
    ...state,
    sidebarShown: !state.sidebarShown
  })
});