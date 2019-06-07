import {makeAction} from './lib';

export const TYPES = {
  TOGGLE_FILTERS: 'UI:FILTERS:TOGGLE'
};

export const toggleFilters =
  (filtersOut) => makeAction(TYPES.TOGGLE_FILTERS, Boolean(filtersOut));