import {makeAction} from './lib';
import {
  FilterStateSelectors
} from '../../components/filters/selectors/selection';
import {DataSelectors} from '../selectors/data';

export const TYPES = {
  SEARCH: 'FILTERS:SEARCH:CHANGE',
  TOGGLE: 'FILTERS:ITEM:TOGGLE',
  TOGGLE_ALL: 'FILTERS:ITEM:TOGGLE_ALL'
};

export const toggleItem = (entityName, itemId, value) => (dispatch, getState) => {
  const selectedItems = FilterStateSelectors[entityName](getState());

  // deselect already selected item
  if (value && selectedItems[itemId]) {
    value = false;
  }

  dispatch(makeAction(TYPES.TOGGLE, value, {
    name: entityName,
    itemId
  }));
};

export const toggleAll = (entityName, value) => (dispatch, getState) => {
  const state = getState();

  const values = DataSelectors[entityName](state).reduce((sum, {id}) => {
    sum[id] = value;
    return sum;
  }, {});
  dispatch(makeAction(TYPES.TOGGLE_ALL, values, {name: entityName}));
};

// TODO: review
export const searchFilters =
  (formName, value) => makeAction(TYPES.SEARCH, value, {name: formName});

