import moment from 'moment';
import {TYPES} from '../../actions/first-steps';
import {TYPES as USER_TYPES} from '../../actions/user';
import {STORE_DATE_FORMAT} from '../Constants';

export const initialState = {
  step: 0,
  data: {
    name: '',
    location: null,
    dates: {
      from: moment().format(STORE_DATE_FORMAT),
      to: moment().add(1, 'month').format(STORE_DATE_FORMAT)
    }
  }
};

export const firstSteps = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.UPDATE:

      // TODO: looks like shit and repeats user reducer
      const {dates} = payload;
      if (Array.isArray(dates) && dates.length === 2) {
        payload.dates = {
          from: dates[0].format(STORE_DATE_FORMAT),
          to: dates[1].format(STORE_DATE_FORMAT)
        };
      }

      return {
        ...state,
        data: {
          ...state.data,
          ...payload
        }
      };

    case TYPES.CHANGE_STEP:
      return {
        ...state,
        step: state.step + payload
      };

    case USER_TYPES.LOGOUT:
      return {
        ...initialState
      };

    default:
      return state;
  }
};