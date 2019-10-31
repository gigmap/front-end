import {Spin} from 'antd';
import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Loading.module.css';

// TODO: reword with Flow Props
export default function Loading({tip, size}) {
  return (
    <div className={styles.wrapper}>
      <Spin size={size || 'large'} tip={tip}/>
    </div>
  );
};

Loading.propTypes = {
  tip: PropTypes.string,
  size: PropTypes.string
};