import {makeAction} from './lib';

export const TYPES = {
  TOGGLE_FILTERS: 'UI:FILTERS:TOGGLE',
  TOGGLE_LOCATION: 'UI:LOCATION_DIALOG:TOGGLE',
  TOGGLE_DATES: 'UI:DATE_DIALOG:TOGGLE',
  SORT_BY: 'UI:SORTING:SET'
};

export const toggleFilters =
  (filtersOut) => makeAction(TYPES.TOGGLE_FILTERS, Boolean(filtersOut));

export const toggleLocationDialog =
  (visible) => makeAction(TYPES.TOGGLE_LOCATION, Boolean(visible));

export const toggleDateDialog =
  (visible) => makeAction(TYPES.TOGGLE_DATES, Boolean(visible));

export const sortBy = (field) => makeAction(TYPES.SORT_BY, field);