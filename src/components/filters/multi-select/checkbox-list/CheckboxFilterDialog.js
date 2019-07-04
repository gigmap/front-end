// @flow

import * as React from 'react';
import {Button, Checkbox, Modal} from 'antd';
import styles from './CheckboxFilterDialog.module.less';
import type {FilterWording} from '../MultiSelectFilter';
import type {ToggleItemFn} from '../../../../store/actions/filters';
import type {FilterItem} from '../../../../types/FilterItem';

type CheckboxFilterDialogProps = {
  wording: FilterWording,
  dataKey: string,
  isOpen: boolean,

  allItems: FilterItem[],
  filterState: { [string]: boolean },
  availableItems: { [string]: boolean },

  toggleItem: ToggleItemFn,
  toggleFilterDialog: (string, boolean) => void
};

export const CheckboxFilterDialog = (props: CheckboxFilterDialogProps) => {
  const {
    dataKey,
    wording,
    isOpen,
    allItems,
    availableItems,
    filterState,
    toggleFilterDialog,
    toggleItem
  } = props;

  const close = () => toggleFilterDialog(dataKey, false);
  const toggle = (event) => {
    toggleItem(dataKey, event.target.itemId, event.target.checked);
  };

  const renderCheckbox = (it: FilterItem) => {
    const css = [styles.checkbox];
    if (!availableItems[it.id]) {
      css.push(styles.na);
    }

    return <Checkbox key={it.id} itemId={it.id}
                     className={css.join(' ')}
                     checked={filterState[it.id]}
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
      <div className={styles.wrapper}>
        {allItems.map(renderCheckbox)}
      </div>
    </Modal>
  );
};

export default React.memo(CheckboxFilterDialog);