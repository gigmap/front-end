import {createSelector} from 'reselect';

export const createLengthSelector = (getItems) => createSelector(
  getItems,
  (items) => items.length
);