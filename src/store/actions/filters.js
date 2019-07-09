import {makeAction} from './lib';
import {DataSelectors} from '../selectors/data';
import {FilterStateSelectors} from '../../components/filters/selectors/filterState';

export const TYPES = {
  SEARCH: 'FILTERS:SEARCH:CHANGE',
  TOGGLE: 'FILTERS:ITEM:TOGGLE',
  TOGGLE_ALL: 'FILTERS:ITEM:TOGGLE_ALL',
  TOGGLE_DIALOG: 'FILTERS:DIALOG:TOGGLE'
};

export type ToggleItemFn = (string, string, boolean) => void;
export type ToggleAllFn = (string, boolean) => void;

export const toggleItem = (dataKey, itemId, value) => (dispatch, getState) => {
  const selectedItems = FilterStateSelectors[dataKey](getState());

  // deselect already selected item
  if (value && selectedItems[itemId]) {
    value = false;
  }

  dispatch(makeAction(TYPES.TOGGLE, value, {
    name: dataKey,
    itemId
  }));
};

export const toggleAll = (dataKey, value) => (dispatch, getState) => {
  const state = getState();

  const values = DataSelectors[dataKey](state).reduce((sum, {id}) => {
    sum[id] = value;
    return sum;
  }, {});
  dispatch(makeAction(TYPES.TOGGLE_ALL, values, {name: dataKey}));
};

export const toggleFilterDialog = (dataKey, value) =>
  makeAction(TYPES.TOGGLE_DIALOG, value, {dataKey});

// TODO: unused ?
export const searchFilters =
  (formName, value) => makeAction(TYPES.SEARCH, value, {name: formName});

