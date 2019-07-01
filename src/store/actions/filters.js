import {makeAction} from './lib';
import {getData} from '../selectors/basic';
import {DATA_KEYS} from '../../components/filters/Constants';

export const TYPES = {
  SEARCH: 'FILTERS:SEARCH:CHANGE',
  TOGGLE: 'FILTERS:ITEM:TOGGLE',
  TOGGLE_ALL: 'FILTERS:ITEM:TOGGLE_ALL'
};

export const searchFilters =
  (formName, value) => makeAction(TYPES.SEARCH, value, {name: formName});

export const toggleItem =
  (entityName, itemId, value) => makeAction(TYPES.TOGGLE, value, {
    name: entityName,
    itemId
  });

export const toggleAll = (entityName, value) => (dispatch, getState) => {
  const state = getState();
  const key = DATA_KEYS[entityName];
  const values = getData(state, key).reduce((sum, {id}) => {
    sum[id] = value;
    return sum;
  }, {});
  dispatch(makeAction(TYPES.TOGGLE_ALL, values, {name: entityName}));
};
