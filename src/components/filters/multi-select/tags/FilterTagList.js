// @flow
import * as React from 'react';
import type {FilterItem} from '../../../../types/FilterItem';
import FilterItemTag from './FilterItemTag';
import styles from './FilterTagList.module.less';

type FilterTagListProps = {
  items: FilterItem[],
  availability: {[string]: boolean},
  close: Function
};

export const FilterTagList = ({items, close, availability}: FilterTagListProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.tags}>
        {
          items.map(it => (
            <FilterItemTag key={it.id} id={it.id} title={it.displayName}
                           onClose={close} available={availability[it.id]} />
          ))
        }
      </div>
      <div className={styles.gradient}/>
    </div>
  );
};


export default React.memo(FilterTagList);