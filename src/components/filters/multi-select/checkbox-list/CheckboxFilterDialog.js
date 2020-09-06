// @flow

import * as React from 'react';
import {Button, Checkbox, Modal} from 'antd';
import styles from './CheckboxFilterDialog.module.less';
import type {FilterWording} from '../MultiSelectFilter';
import type {
  ToggleAllFn,
  ToggleItemFn
} from '../../../../store/actions/filters';
import type {FilterItem} from '../../../../types/FilterItem';

type CheckboxFilterDialogProps = {
  wording: FilterWording,
  dataKey: string,
  isOpen: boolean,
  allItems: FilterItem[],
  toggleItem: ToggleItemFn,
  toggleAll: ToggleAllFn,
  toggleFilterDialog: (string, boolean) => void
};

export const CheckboxFilterDialog = (props: CheckboxFilterDialogProps) => {
  const {
    dataKey,
    wording,
    isOpen,
    allItems,
    toggleFilterDialog,
    toggleItem,
    toggleAll
  } = props;

  const close = () => toggleFilterDialog(dataKey, false);
  const toggle = (event) => {
    toggleItem(dataKey, event.target.itemId, event.target.checked);
  };
  const selectAll = () => toggleAll(dataKey, true);
  const deselectAll = () => toggleAll(dataKey, false);

  const renderCheckbox = (it: FilterItem) => {
    const css = [styles.checkbox];
    if (!it.isAvailable) {
      css.push(styles.na);
    }

    return <Checkbox key={it.id} itemId={it.id}
                     className={css.join(' ')}
                     checked={it.isSelected}
                     onChange={toggle}
    >
      {it.displayName}
    </Checkbox>;
  };

  return (
    <Modal
      title={`Select ${wording.plural}`}
      visible={isOpen}
      onCancel={close}
      footer={<Button onClick={close}>OK</Button>}
    >
      <div className={styles.controls}>
        <Button onClick={selectAll}>Select all {wording.plural}</Button>
        <Button onClick={deselectAll}>Clear</Button>
      </div>
      <div className={styles.wrapper}>
        {allItems.map(renderCheckbox)}
      </div>
    </Modal>
  );
};

export default React.memo(CheckboxFilterDialog);