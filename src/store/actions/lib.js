export const makeRequestTypes = (prefix) => ({
  START: `${prefix}:START`,
  SUCCESS: `${prefix}:SUCCESS`,
  FAILED: `${prefix}:FAILED`
});

export const makeAction =
  (type, payload, meta) => (meta ? {type, payload, meta} : {type, payload});