import {makeAction, makeRequestTypes} from './lib';
import {getConcerts} from '../api';

export const TYPES = {
  LOADING: makeRequestTypes('DATA:LOADING')
};

export const load = ({username}) => (dispatch) => {
  dispatch(makeAction(TYPES.LOADING.START));

  getConcerts({username})
    .then(data => dispatch(makeAction(TYPES.LOADING.SUCCESS, data)))
    .catch(({message}) => dispatch(makeAction(TYPES.LOADING.FAILED, message)));
};