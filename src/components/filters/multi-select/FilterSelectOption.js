// @flow
import * as React from 'react';
import {AutoComplete} from 'antd';
import type {FilterItem} from '../../../types/FilterItem';

const {Option} = AutoComplete;

export const FilterSelectOption = (props: FilterItem) => {
  return (
    <Option key={props.id}>{props.displayName}</Option>
  );
};

export default React.memo(FilterSelectOption);