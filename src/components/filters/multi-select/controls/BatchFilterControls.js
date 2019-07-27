// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {toggleAll} from '../../../../store/actions/filters';
import styles from './BatchFilterControls.module.less';

type BatchFilterControlsProps = {
  dataKey: string,
  word: string,
  totalQty: number,
  selectedQty: number,
  toggleAll: Function
};

export const BatchFilterControls = (props: BatchFilterControlsProps) => {

  const {dataKey, toggleAll, word, selectedQty, totalQty} = props;

  const selectAll = () => toggleAll(dataKey, true);
  const deselectAll = () => toggleAll(dataKey, false);

  return (
    <div className={styles.controls}>
      <div className={styles.status}>
        {selectedQty}/{totalQty} selected
      </div>

      <span>
        <Button type={'link'} className={styles.batchButton} onClick={selectAll}>
          Select all {word}
        </Button>
        <Button type={'link'} className={styles.batchButton} onClick={deselectAll}>
          Clear
        </Button>
      </span>
    </div>
  );
};

const mapDispatchToProps = {toggleAll};

export default connect(null, mapDispatchToProps)(React.memo(BatchFilterControls));