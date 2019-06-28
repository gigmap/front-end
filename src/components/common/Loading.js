import {Spin} from 'antd';
import React from 'react';
import * as PropTypes from 'prop-types';

export default function Loading({tip, size}) {
  return (
    <div style={{margin: 50, textAlign: 'center'}}>
      <Spin size={size || 'large'} tip={tip}/>
    </div>
  );
};

Loading.propTypes = {
  tip: PropTypes.string,
  size: PropTypes.string
};