// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {AutoComplete, Button} from 'antd';
import styles from './MultiSelectFilter.module.less';
import {toggleAll, toggleItem} from '../../../store/actions/filters';
import FilterItemTag from './tags/FilterItemTag';

const {Option} = AutoComplete;

type MultiSelectFilterProps = {
  allItems: [],
  selectedItems: [],
  entityName: string,
  filterName: string,
  toggleItem: (string, string, boolean) => void,
  toggleAll: (string, boolean) => void
};

const filterFunction = (inputValue, option) =>
  option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;

// TODO: decompose

export const MultiSelectFilter = (props: MultiSelectFilterProps) => {

  const {
    allItems,
    selectedItems,
    entityName,
    filterName,
    toggleItem,
    toggleAll
  } = props;

  const [input, setInput] = useState('');

  const selectItem = (id) => toggleItem(filterName, id, true);
  const deselectItem = (id) => toggleItem(filterName, id, false);
  const selectAll = () => toggleAll(filterName, true);
  const deselectAll = () => toggleAll(filterName, false);

  const options = allItems.map(({id, displayName}) => (
    <Option key={id}>{displayName}</Option>
  ));

  // TODO: use object for onChange
  return (
    <>
      <AutoComplete
        className={styles.input}
        value={input}
        placeholder={`Start typing ${entityName} name`}
        filterOption={filterFunction}
        onChange={(value) => {
          const isSelected = allItems.some(it => it.id === value);
          setInput(isSelected ? '' : value);
        }}
        onSelect={selectItem}
      >
        {options}
      </AutoComplete>

      <div className={styles.controls}>
        <div className={styles.left}>
          <Button type={'link'} onClick={selectAll}>Select All</Button>
          <Button type={'link'} onClick={deselectAll}>Clear</Button>
        </div>

        <Button type={'link'} disabled={true}>See All</Button>
      </div>

      <div className={styles.tags}>
        {
          selectedItems.map(it => (
            <FilterItemTag key={it.id} id={it.id} title={it.displayName}
                           onClose={deselectItem}/>
          ))
        }
      </div>
    </>
  );
};

const MemoMultiSelectFilter = React.memo(MultiSelectFilter);

const mapDispatchToProps = {
  toggleItem, toggleAll
};

export default connect(null, mapDispatchToProps)(MemoMultiSelectFilter);