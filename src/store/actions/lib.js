// @flow

export type RequestActionType = {
  START: string,
  SUCCESS: string,
  FAILED: string
};

export const makeRequestTypes = (prefix: string): RequestActionType => ({
  START: `${prefix}:START`,
  SUCCESS: `${prefix}:SUCCESS`,
  FAILED: `${prefix}:FAILED`
});

export const makeAction =
  (type, payload, meta) => (meta ? {type, payload, meta} : {type, payload});

// TODO: use where applicable
export const makeRequest = (
  callApi: () => Promise<any>,
  type: RequestActionType) =>
  (dispatch: Function) => {
    dispatch(makeAction(type.START));
    callApi()
      .then((it) => {
        dispatch(makeAction(type.SUCCESS, it));
      })
      .catch((errors) => {
        dispatch(makeAction(type.FAILED, errors));
      });
  };
