// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {setPosition} from '../../../../../store/reducers/map/actions';
import {Button, Tooltip, message} from 'antd';
import styles from './LocateButton.module.less';

const mapDispatchToProps = {setPosition};
type LocateButtonProps = typeof mapDispatchToProps;

export const LocateButton = ({setPosition}: LocateButtonProps) => {
  const [loading, setLoading] = useState(false);
  const tryToLocate = () => {
    if (navigator.geolocation) {
      setLoading(true);

      navigator.geolocation.getCurrentPosition((position) => {
        setLoading(false);
        setPosition([position.coords.latitude, position.coords.longitude], 5);
      }, (error) => {
        setLoading(false);
        const errorMessage = {
          [error.PERMISSION_DENIED]: 'please allow geolocation to use this feature',
          [error.POSITION_UNAVAILABLE]: 'location information is unavailable, please try again later',
          [error.TIMEOUT]: 'location request took too long, please try again later'
        }[error.code] || 'Unknown error';
        message.warning(`Error: ${errorMessage}`, 5);
      });
    } else {
      message.warning('Error: geolocation is not supported by this browser.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <Tooltip placement={'right'} title={'Locate me'}>
        <Button icon={'fullscreen-exit'} loading={loading}
                onClick={tryToLocate} />
      </Tooltip>
    </div>
  );
};

const MemoLocateButton = React.memo(LocateButton);

export const ConnectedLocateButton =
  connect(null, mapDispatchToProps)(MemoLocateButton);