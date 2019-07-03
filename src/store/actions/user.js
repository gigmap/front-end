import {makeAction} from './lib';

export const TYPES = {
  LOGIN: 'USER:AUTH:LOGIN',
  LOGOUT: 'USER:AUTH:LOGOUT',
  SET_LOCATION: 'USER:LOCATION:SET',
  SET_DATES: 'USER:DATES:SET'
};

export const login = () => (dispatch, getState) => {
  const {firstSteps: {data}} = getState();
  dispatch(makeAction(TYPES.LOGIN, data));
};

export const logout = () => makeAction(TYPES.LOGOUT);

// export const setLocation =
//   ({lat, lng}) => makeAction(TYPES.SET_LOCATION, {lat, lng});

export const unsetLocation = () => makeAction(TYPES.SET_LOCATION, null);

export const setDates = (datesArray) => makeAction(TYPES.SET_DATES, datesArray);

export const unsetDates = () => makeAction(TYPES.SET_DATES, null);