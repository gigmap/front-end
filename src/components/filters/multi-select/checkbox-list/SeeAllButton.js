// @flow

import * as React from 'react';
import {connect} from 'react-redux';
import {Button, Icon, Tooltip} from 'antd';
import {toggleFilterDialog} from '../../../../store/actions/filters';
import styles from './SeeAllButton.module.less';

type SeeAllButtonProps = {
  dataKey: string,
  toggleFilterDialog: (string, boolean) => void
};

export const SeeAllButton = (props: SeeAllButtonProps) => {
  const {toggleFilterDialog, dataKey} = props;
  const open = () => toggleFilterDialog(dataKey, true);

  return (
    <Tooltip title={'See as a list'} placement={'left'}>
      <Button
        className={styles.seeAllButton}
        onClick={open}
      >
        <Icon type="unordered-list"/>
      </Button>
    </Tooltip>
  );
};

const mapDispatchToProps = {toggleFilterDialog};

export default connect(null, mapDispatchToProps)(React.memo(SeeAllButton));