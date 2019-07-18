import {makeAction} from './lib';

export const TYPES = {
  SET_SHOWN: 'MAP:SHOWN_ITEMS:SET',
  TOGGLE_POPUP: 'MAP:LIST_POPUP:TOGGLE'
};

export const setShownGigIds = (ids) => makeAction(TYPES.SET_SHOWN, ids);

export const toggleShownGigsPopup = (isOpen) => makeAction(TYPES.TOGGLE_POPUP, isOpen);
