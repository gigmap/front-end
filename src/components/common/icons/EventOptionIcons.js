// @flow

import React from 'react';
import {Icon, Tooltip} from 'antd';
import type {Concert} from '../../../types';

type GoingIconProps = {
  concert: Concert
};

const iconStyle = {marginLeft: 5};

export const GoingIcon = () => (
  <Icon style={iconStyle} type="check-circle" theme="twoTone"
        twoToneColor="#52c41a" />
);

export const InterestedIcon = () => (
  <Icon style={iconStyle} type="eye" theme="twoTone" />
);

export const PostponedIcon = () => (
  <Icon style={iconStyle} type="clock-circle" theme="twoTone"
        twoToneColor={'#ff931d'} />
);

export const FestivalIcon = () => (
  <Icon style={iconStyle} type="fire" theme="twoTone"
        twoToneColor={'red'} />
);

export const EventOptionIcons = (props: GoingIconProps) => {
  const {concert} = props;
  const icons = [];

  // Function called instead of components usage because AntD tooltop
  // works only this way
  // TODO: check AntD 4.x

  if (concert.going) {
    icons.push(
      <Tooltip key={'going'} placement={'right'} title="You are going">
        {GoingIcon()}
      </Tooltip>
    );
  } else if (concert.interested) {
    icons.push(
      <Tooltip key={'interested'} placement={'right'} title="You are interested">
        {InterestedIcon()}
      </Tooltip>
    );
  }

  if (concert.postponed) {
    icons.push(
      <Tooltip key={'postponed'} placement={'right'} title="The event is postponed">
        {PostponedIcon()}
      </Tooltip>
    );
  }

  if (concert.isFestival) {
    icons.push(
      <Tooltip key={'isFestival'} placement={'right'} title="This is a festival">
        {FestivalIcon()}
      </Tooltip>
    );
  }

  if (icons.length === 0) {
    return null;
  }

  return (
    <>
      {icons}
    </>
  );
};

export const MemoizedEventOptionIcons = React.memo(EventOptionIcons);
