// @flow

import React from 'react';
import {connect} from 'react-redux';
import * as ReactGA from 'react-ga';
import {login} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';
import {Button} from 'antd';
import {EVENTS} from '../../../constants/Tracking';

const DEMO_USERNAME = 'Dig-a-Gig-Demo';

const mapDispatchToProps = {
  login, load
};

type TryOutButtonProps = typeof mapDispatchToProps;

export const TryOutButton = (props: TryOutButtonProps) => {
  const {load, login} = props;
  const onClick = () => {
    ReactGA.event({
      category: EVENTS.User.category,
      action: EVENTS.User.actions.DemoAccountUsed
    });
    login(DEMO_USERNAME);
    load(true);
  };
  return (
    <Button type={'primary'} ghost onClick={onClick}>
      Try it out
    </Button>
  );
};


export const ConnectedTryOutButton =
  connect(null, mapDispatchToProps)(TryOutButton);