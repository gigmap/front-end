import {EVENT_OPTIONS_FILTER_KEY} from '../reducers/Constants';
import {INITIAL_EVENT_OPTIONS} from '../reducers/filters/selected';

export const MIGRATIONS = {
  // add event display filters
  0: (state) => {
    const newState = {...state};
    newState.filters.selected[EVENT_OPTIONS_FILTER_KEY] = {...INITIAL_EVENT_OPTIONS};
    return newState;
  }
}

const versions = Object.keys(MIGRATIONS);
export const CURRENT_VERSION = versions[versions.length - 1];
