// @flow

import React from 'react';
import {Tag} from 'antd';
import styles from './FilterItemTag.module.css';

type FilterItemTagProps = {
  title: string,
  id: string,
  onClose: (string) => void
};

const FilterItemTag = (props: FilterItemTagProps) => {
  const {id, title, onClose} = props;

  return (
    <Tag className={styles.tag} closable onClose={() => onClose(id)}>
      {title}
    </Tag>
  );
};

export default React.memo(FilterItemTag);