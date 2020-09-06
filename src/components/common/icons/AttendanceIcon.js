// @flow

import React from 'react';
import {Icon, Tooltip} from 'antd';
import type {Concert} from '../../../types';

type GoingIconProps = {
  concert: Concert
};

export const GoingIcon = () => (
  <Icon style={{marginLeft: 5}} type="check-circle" theme="twoTone"
        twoToneColor="#52c41a" />
);

export const InterestedIcon = () => (
  <Icon style={{marginLeft: 5}} type="eye" theme="twoTone" />
);

export const AttendanceIcon = (props: GoingIconProps) => {
  const {concert} = props;

  if (concert.going) {
    return (
      <Tooltip title="You are going">
        <GoingIcon />
      </Tooltip>
    );
  }

  if (concert.interested) {
    return (
      <Tooltip title="You are interested">
        <InterestedIcon />
      </Tooltip>
    );
  }

  return null;
};

export const MemoizedAttendanceIcon = React.memo(AttendanceIcon);
