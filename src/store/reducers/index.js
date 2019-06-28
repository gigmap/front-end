import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {user} from './user/user'
import {data} from './data/data'
import {ui} from './ui/ui'
import {filters} from './filters/filters';
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