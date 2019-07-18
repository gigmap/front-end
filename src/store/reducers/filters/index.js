import {combineReducers} from 'redux';
import {ui} from './ui';
import {selected} from './selected';

export const filters = combineReducers({
  selected,
  ui
});