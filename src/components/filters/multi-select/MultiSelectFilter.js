// @flow

import React, {useState} from 'react';
import {AutoComplete, Button} from 'antd';
import styles from './MultiSelectFilter.module.less';
import {default as FilterTagList} from './tags/FilterTagList';
import {getDropdownOptionRenderer} from './getDropdownOptionRenderer';
import type {FilterItem} from '../../../types/FilterItem';

const renderOption = getDropdownOptionRenderer(styles.itemIcon);

export type FilterWording = {
  singular: string,
  plural: string
};

type MultiSelectFilterProps = {
  allItems: FilterItem[],
  itemsIdMap: { [string]: boolean },
  selectedItems: FilterItem[],
  filterState: { [string]: boolean },
  wording: FilterWording,
  dataKey: string,
  toggleItem: (string, string, boolean) => void,
  toggleAll: (string, boolean) => void
};

const filterFunction = (inputValue, option) => {
  return option.props.uppercase.indexOf(inputValue.toUpperCase()) !== -1;
};

// TODO: decompose

export const MultiSelectFilter = (props: MultiSelectFilterProps) => {

  const {
    allItems,
    itemsIdMap,
    selectedItems,
    filterState,
    wording,
    dataKey,
    toggleItem,
    toggleAll
  } = props;

  const [input, setInput] = useState('');

  const selectItem = (id) => toggleItem(dataKey, id, true);
  const deselectItem = (id) => toggleItem(dataKey, id, false);
  const selectAll = () => toggleAll(dataKey, true);
  const deselectAll = () => toggleAll(dataKey, false);

  const handleTextChange = (value) => {
    // clear input on option selected
    setInput(itemsIdMap[value] ? '' : value);
  };

  const options = allItems
    .map(it => ({...it, isSelected: filterState[it.id]}))
    .map(renderOption);

  return (
    <>
      <AutoComplete
        className={styles.input}
        value={input}
        placeholder={`Start typing ${wording.singular} name`}
        filterOption={filterFunction}
        onChange={handleTextChange}
        onSelect={selectItem}
      >
        {options}
      </AutoComplete>

      <div className={styles.controls}>
        <div className={styles.left}>
          <Button type={'link'} onClick={selectAll}>
            Select all {wording.plural}
          </Button>
          <Button type={'link'} onClick={deselectAll}>Clear</Button>
        </div>

        <Button type={'link'} disabled={true}>See All</Button>
      </div>

      <FilterTagList items={selectedItems} close={deselectItem}/>
    </>
  );
};

export default React.memo(MultiSelectFilter);