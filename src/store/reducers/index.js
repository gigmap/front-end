import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {user} from './user/user'
import {data} from './data/data'
import {ui} from './ui/ui'
import {filters} from './filters/filters';

export default function createRootReducer() {
  return combineReducers({
    user,
    data,
    ui,
    filters,
    form: formReducer
  });
}