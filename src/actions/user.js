import {makeAction} from './lib';

export const TYPES = {
  LOGIN: 'USER:AUTH:LOGIN',
  LOGOUT: 'USER:AUTH:LOGOUT'
};

export const login =
  ({username, artistQty}) => makeAction(TYPES.LOGIN, {username, artistQty});

export const logout = () => makeAction(TYPES.LOGOUT);