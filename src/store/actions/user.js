import {makeAction} from './lib';

export const TYPES = {
  LOGIN: 'USER:AUTH:LOGIN',
  LOGOUT: 'USER:AUTH:LOGOUT',
  SET_LOCATION: 'USER:LOCATION:SET'
};

export const login =
  ({username, artistQty}) => makeAction(TYPES.LOGIN, {username, artistQty});

export const logout = () => makeAction(TYPES.LOGOUT);

export const setLocation =
  ({lat, lng}) => makeAction(TYPES.SET_LOCATION, {lat, lng});

export const unsetLocation = () => makeAction(TYPES.SET_LOCATION, null);