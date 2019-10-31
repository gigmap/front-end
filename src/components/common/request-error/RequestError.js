// @flow
import React from 'react';
import {Alert} from 'antd';

type RequestErrorProps = {
  error: string | null,
  className?: string
};

export const RequestError = (props: RequestErrorProps) => {
  const {error, ...other} = props;
  if (!error) {
    return null;
  }

  return (
    <Alert type={'error'} showIcon message={error} {...other} />
  );
};