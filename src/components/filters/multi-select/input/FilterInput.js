// @flow

import React, {useState} from 'react';
import {AutoComplete} from 'antd';
import {renderDropdownOption} from './renderDropdownOption';
import styles from './FilterInput.module.less';
import type {FilterItem} from '../../../../types/FilterItem';
import type {FilterWording} from '../MultiSelectFilter';

type MultiSelectFilterProps = {
  allItems: FilterItem[],
  itemsIdMap: { [string]: boolean },
  filterState: { [string]: boolean },
  availableItems: { [string]: boolean },
  wording: FilterWording,
  dataKey: string,
  toggleItem: (string, string, boolean) => void
};

const filterFunction = (inputValue, option) => {
  return option.props.uppercaseName.indexOf(inputValue.toUpperCase()) !== -1;
};

export const FilterInput = (props: MultiSelectFilterProps) => {

  const {
    allItems,
    itemsIdMap,
    filterState,
    availableItems,
    wording,
    dataKey,
    toggleItem
  } = props;

  const [input, setInput] = useState('');

  const selectItem = (id) => toggleItem(dataKey, id, true);
  const handleTextChange = (value) => {
    // clear input on option selected
    setInput(itemsIdMap[value] ? '' : value);
  };

  // TODO: selector (?) this shit re-renders all the time
  const options = allItems
    .map(it => ({
      ...it,
      isSelected: filterState[it.id],
      isAvailable: availableItems[it.id]
    }))
    .map(renderDropdownOption);

  return (
    <AutoComplete
      className={styles.input}
      value={input}
      placeholder={`Start typing ${wording.singular} name`}
      filterOption={filterFunction}
      onChange={handleTextChange}
      onSelect={selectItem}
      dataSource={options}
    />
  );
};

export default React.memo(FilterInput);