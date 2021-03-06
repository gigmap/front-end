// @flow
import * as React from 'react';
import {AutoComplete, Icon} from 'antd';
import styles from './FilterInput.module.less';
import type {FilterItem} from '../../../../types/FilterItem';

const {Option} = AutoComplete;

type FilterSelectOptionProps = FilterItem;

function CheckIcon() {
  return (
    <Icon type={'check'} className={styles.itemIcon} />
  );
}

// can't use React Component - AntD needs <Option> component
export const renderDropdownOption = (props: FilterSelectOptionProps) => {
  const {id, displayName, isSelected, isAvailable} = props;

  const css = isAvailable ? null : styles.naOption;

  return (
    <Option key={id} uppercasename={displayName.toUpperCase()} className={css}>
      {isSelected && <CheckIcon />}
      {displayName}
    </Option>
  );
};