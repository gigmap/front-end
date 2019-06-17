import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form'
import {user} from './user'
import {data} from './data/data'
import {ui} from './ui'

export default function createRootReducer() {
  return combineReducers({
    user,
    data,
    ui,
    form: formReducer
  });
}