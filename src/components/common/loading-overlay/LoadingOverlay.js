import React from 'react';
import styles from './LoadingOverlay.module.css';
import Loading from '../Loading';

const LoadingOverlay = () => {
  return (
    <div className={styles.wrapper}>
      <Loading/>
    </div>
  );
};

export default LoadingOverlay;