import {TYPES as USER} from '../../actions/user';
import {TYPES as DATA} from '../../actions/data';
import {prepareConcert} from './mappers';

const initialState = {
  loading: false,
  finished: false,
  error: null,

  countries: [],
  artists: [],
  concerts: []
};

export const data = (state = initialState, {type, payload}) => {
  switch (type) {

    case DATA.LOADING.START:
      return {
        ...initialState,
        loading: true
      };


    case DATA.LOADING.SUCCESS:
      const {countries, artists, concerts} = payload;
      return {
        ...initialState,
        loading: false,
        finished: true,
        countries,
        artists,
        concerts: concerts.map(prepareConcert)
      };


    case DATA.LOADING.FAILED:
      return {
        ...initialState,
        loading: false,
        finished: true,
        error: payload
      };

    case USER.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};