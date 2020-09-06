import {makeAction} from '../../actions/lib';

export const TYPES = {
  SET_SHOWN: 'MAP:SHOWN_ITEMS:SET',
  TOGGLE_POPUP: 'MAP:LIST_POPUP:TOGGLE',
  SET_POSITION: 'MAP:POSITION:SET'
};

export const setShownGigIds = (ids) => makeAction(TYPES.SET_SHOWN, ids);

export const toggleShownGigsPopup = (isOpen) => makeAction(TYPES.TOGGLE_POPUP, isOpen);

export const setPosition = (center, zoom = 4) =>
  makeAction(TYPES.SET_POSITION, {center, zoom});
