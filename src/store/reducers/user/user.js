// @flow

import {TYPES} from '../../actions/user';
import moment, {Moment} from 'moment';

const STORE_DATE_FORMAT = 'YYYY-MM-DD';

export const initialState = {
  name: null,
  artistQty: 0,
  location: null,
  dates: {
    from: moment().format(STORE_DATE_FORMAT),
    to: moment().add(1, 'month').format(STORE_DATE_FORMAT)
  }
};

export const user = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.LOGIN:
      return {
        ...state,
        name: payload.username,
        artistQty: payload.artistQty
      };

    case TYPES.SET_LOCATION:
      return {
        ...state,
        location: payload ? {...payload} : null
      };


    case TYPES.SET_DATES:
      const dates: Moment[] = payload;

      // dates indeed
      if (Array.isArray(dates) && dates.length === 2) {
        return {
          ...state, dates: {
            from: dates[0].format(STORE_DATE_FORMAT),
            to: dates[1].format(STORE_DATE_FORMAT)
          }
        };
      }

      // some other stuff
      return {...state, dates: null};

    case TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};