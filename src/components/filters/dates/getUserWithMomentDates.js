import {createSelector} from 'reselect';
import moment from 'moment';
import {getUser} from '../../../store/reducers/user/selectors';

// TODO: dates should be moved to filters (!)
export const getUserWithMoment = createSelector(
  getUser,

  (user) => {
    const {dates} = user;
    if (!dates) {
      return user;
    }

    return {
      ...user,
      dates: {
        from: moment(dates.from).startOf('day'),
        to: moment(dates.to).startOf('day')
      }
    }
  });