import React from 'react';
import {Checkbox, Popover} from 'antd';
import styles from './FilterCheckbox.module.scss';

const MAX_LABEL_LENGTH = 20;

export const FilterCheckbox = (props) => {
  const {input, label, available, ...rest} = props;

  const text = label.length >= MAX_LABEL_LENGTH ?
    <Popover content={label}>{label}</Popover> :
    label;

  const spanStyle = available ? null : styles.emptyOption;

  return (
    <Checkbox checked={Boolean(input.value)} {...input} {...rest}>
      <span className={spanStyle}>{text}</span>
    </Checkbox>
  );
};