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
      <Button type={'link'} onClick={selectAll}>
        Select all {word}
      </Button>
      <Button type={'link'} onClick={deselectAll}>
        Clear
      </Button>
    </div>
  );
};

const mapDispatchToProps = {toggleAll};

export default connect(null, mapDispatchToProps)(React.memo(BatchFilterControls));