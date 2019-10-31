import {makeAction, makeRequestTypes} from './lib';
import {getConcerts} from '../../api/gigmap/gigmap';
import {toggleAll} from './filters';
import {DATA_KEYS} from '../reducers/Constants';

export const TYPES = {
  LOADING: makeRequestTypes('DATA:LOADING')
};

export const load = (selectAll = false) => (dispatch, getState) => {
  const {user: {name, dates}} = getState();

  const params = {username: name};
  if (dates) {
    params.from = dates.from;
    params.to = dates.to;
  }

  dispatch(makeAction(TYPES.LOADING.START));
  getConcerts(params)
    .then(data => {
      dispatch(makeAction(TYPES.LOADING.SUCCESS, data));
      if (selectAll) {
        toggleAll(DATA_KEYS.ARTISTS, true)(dispatch, getState);
        toggleAll(DATA_KEYS.COUNTRIES, true)(dispatch, getState);
      }
    })
    .catch(({message}) => dispatch(makeAction(TYPES.LOADING.FAILED, message)));
};