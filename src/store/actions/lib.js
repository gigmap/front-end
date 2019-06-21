export const makeRequestTypes = (prefix) => ({
  START: `${prefix}:START`,
  SUCCESS: `${prefix}:SUCCESS`,
  FAILED: `${prefix}:FAILED`
});

export const makeAction = (type, payload) => ({type, payload});