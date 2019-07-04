// @flow
import * as React from 'react';
import {AutoComplete, Icon} from 'antd';
import type {FilterItem} from '../../../types/FilterItem';

const {Option} = AutoComplete;

type FilterSelectOptionProps = FilterItem & {
  isSelected: boolean,
  isAvailable: boolean,
}

function CheckIcon(props) {
  return (
    <Icon type={'check'} {...props} />
  );
}

export const getDropdownOptionRenderer = (iconClass) => (props: FilterSelectOptionProps) => {
  const {id, displayName, isSelected, isAvailable} = props;

  const style = isAvailable ? {} : {color: '#ccc'};

  return (
    <Option key={id} uppercase={displayName.toUpperCase()} style={style}>
      {isSelected && <CheckIcon className={iconClass}/>}
      &nbsp;&nbsp;
      {displayName}
    </Option>
  );
};