import {makeAction, makeRequestTypes} from './lib';
import {getConcerts} from '../../api/gigmap';

export const TYPES = {
  LOADING: makeRequestTypes('DATA:LOADING')
};

export const load = () => (dispatch, getState) => {
  const {user: {name, dates}} = getState();

  const params = {username: name};
  if (dates) {
    params.from = dates.from;
    params.to = dates.to;
  }

  dispatch(makeAction(TYPES.LOADING.START));
  getConcerts(params)
    .then(data => dispatch(makeAction(TYPES.LOADING.SUCCESS, data)))
    .catch(({message}) => dispatch(makeAction(TYPES.LOADING.FAILED, message)));
};