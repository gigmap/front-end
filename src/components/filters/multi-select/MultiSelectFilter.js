// @flow

import React from 'react';
import styles from './MultiSelectFilter.module.less';
import {default as FilterTagList} from './tags/FilterTagList';
import {default as BatchFilterControls} from './controls/BatchFilterControls';
import {default as FilterInput} from './input/FilterInput';
import {default as SeeAllButton} from './checkbox-list/SeeAllButton';
import type {FilterItem} from '../../../types/FilterItem';
import type {ToggleItemFn} from '../../../store/actions/filters';

export type FilterWording = {
  singular: string,
  plural: string
};

type MultiSelectFilterProps = {
  allItems: FilterItem[],
  itemsIdMap: { [string]: boolean },
  selectedItems: FilterItem[],
  wording: FilterWording,
  dataKey: string,
  toggleItem: ToggleItemFn
};

export const MultiSelectFilter = (props: MultiSelectFilterProps) => {

  const {
    allItems,
    itemsIdMap,
    selectedItems,
    wording,
    dataKey,
    toggleItem
  } = props;

  const deselectItem = (id) => toggleItem(dataKey, id, false);

  return (
    <>
      <div className={styles.inputWrapper}>
        <FilterInput
          allItems={allItems}
          itemsIdMap={itemsIdMap}
          wording={wording}
          dataKey={dataKey}
          toggleItem={toggleItem}/>

        <SeeAllButton dataKey={dataKey}/>
      </div>

      <BatchFilterControls dataKey={dataKey} word={wording.plural}
                           totalQty={allItems.length}
                           selectedQty={selectedItems.length}
      />
      <FilterTagList items={selectedItems} close={deselectItem}/>
    </>
  );
};

export default React.memo(MultiSelectFilter);