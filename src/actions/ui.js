import {makeAction} from './lib';

export const TYPES = {
  TOGGLE_FILTERS: 'UI:FILTERS:TOGGLE',
  TOGGLE_LOCATION: 'UI:LOCATION:TOGGLE'
};

export const toggleFilters =
  (filtersOut) => makeAction(TYPES.TOGGLE_FILTERS, Boolean(filtersOut));

export const toggleLocationDialog =
  (visible) => makeAction(TYPES.TOGGLE_LOCATION, Boolean(visible));