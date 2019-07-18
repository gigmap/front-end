import {combineReducers} from 'redux';
import {user} from './user/user';
import {data} from './data/data';
import {filters} from './filters';
import {firstSteps} from './ui/first-steps';

export default function createRootReducer() {
  return combineReducers({
    user,
    data,
    ui,
    filters,
    firstSteps,
    form: formReducer
  });
}