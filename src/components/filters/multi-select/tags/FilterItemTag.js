// @flow

import React from 'react';
import {Tag} from 'antd';
import styles from './FilterItemTag.module.css';

type FilterItemTagProps = {
  title: string,
  id: string,
  onClose: (string) => void,
  available: boolean
};

const FilterItemTag = (props: FilterItemTagProps) => {
  const {id, title, onClose, available} = props;

  const classNames = [styles.tag];
  if (!available) {
    classNames.push(styles.notAvailable);
  }

  return (
    <Tag className={classNames.join(' ')} closable onClose={() => onClose(id)}>
      {title}
    </Tag>
  );
};

export default React.memo(FilterItemTag);