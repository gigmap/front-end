import React from 'react';
import {Checkbox, Popover} from 'antd';

const MAX_LABEL_LENGTH = 20;

export const ReduxAntCheckbox = (props) => {
  const {input, label, ...rest} = props;

  const text = label.length >= MAX_LABEL_LENGTH ?
    <Popover content={label}>{label}</Popover> :
    label;

  return (
    <Checkbox checked={Boolean(input.value)} {...input} {...rest}>
      {text}
    </Checkbox>
  );
};

/*
const createFieldComponent = Component => (props) => {
  const { input, meta, hasFeedback, label, siblings, ...rest } = props;
  const hasError = meta.touched && meta.invalid;

  return (
    <Form.Item
      label={label}
      validateStatus={hasError ? "error" : "success"}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
    >
      <Component {...input} {...rest} />
      {siblings}
    </Form.Item>
  );
};
 */