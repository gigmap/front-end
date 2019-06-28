import {makeAction} from './lib';

export const TYPES = {
  UPDATE: 'FIRST-STEPS:DATA:UPDATE',
  CHANGE_STEP: 'FIRST-STEPS:STEP:CHANGE'
};

export const updateUserData = (data) => makeAction(TYPES.UPDATE, data);

export const moveToNextStep = () => makeAction(TYPES.CHANGE_STEP, 1);
export const moveToPrevStep = () => makeAction(TYPES.CHANGE_STEP, -1);