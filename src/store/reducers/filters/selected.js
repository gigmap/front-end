import {TYPES} from '../../actions/filters';
import {
  ARTISTS_DATA_KEY as ARTISTS,
  COUNTRIES_DATA_KEY as COUNTRIES,
  EVENT_OPTIONS_FILTER_KEY as EVENT_OPTIONS
} from '../Constants';
import {initReducer} from '../initReducer';

export type EventOptionsFilter = {
  going: boolean;
  interested: boolean;
  noAttendance: boolean;
  postponed: boolean;
  festivals: boolean;
  concerts: boolean;
}

export const INITIAL_EVENT_OPTIONS = {
  going: true,
  interested: true,
  noAttendance: true,
  postponed: true,
  festivals: true,
  concerts: true
};

const initialState = {
  [COUNTRIES]: {},
  [ARTISTS]: {},
  [EVENT_OPTIONS]: {
    ...INITIAL_EVENT_OPTIONS
  }
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