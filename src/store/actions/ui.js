import {makeAction} from './lib';

export const TYPES = {
  TOGGLE_MOBILE_SIDEBAR: 'UI:MOBILE_SIDEBAR:TOGGLE'
};

export const toggleMobileSidebar = () => makeAction(TYPES.TOGGLE_MOBILE_SIDEBAR);