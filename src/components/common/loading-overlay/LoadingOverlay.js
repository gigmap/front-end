// @flow
import React from 'react';
import styles from './LoadingOverlay.module.css';
import Loading from '../loading/Loading';

type LoadingOverlayProps = {
  visible?: boolean
}

const LoadingOverlay = (props: LoadingOverlayProps) => {
  const {visible} = props;
  if (visible === false) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Loading/>
    </div>
  );
};

export default LoadingOverlay;