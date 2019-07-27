import {combineReducers} from 'redux';
import {user} from './user/user';
import {data} from './data/data';
import {filters} from './filters';
import {map} from './map';
import {ui} from './ui';

export default function createRootReducer() {
  return combineReducers({
    user,
    data,
    filters,
    map,
    ui
  });
}