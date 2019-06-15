import React from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from 'antd/lib/index';
import * as PropTypes from 'prop-types';
import {sortBy} from '../../../actions/ui';
import styles from './SortingBlock.module.css';
import {SORTING} from './Constants';

function SortingBlock({sorting, sortBy}) {
  const dateBtnType = sorting === SORTING.date ? 'primary' : 'default';
  const distanceBtnType = sorting === SORTING.distance ? 'primary' : 'default';

  return (
    <div className={styles.wrapper}>
      <Button className={styles.button} type={dateBtnType}
              onClick={() => sortBy(SORTING.date)}>
        <Icon type='calendar'/> Date <Icon type='down'/></Button>
      <Button className={styles.button} type={distanceBtnType}
              onClick={() => sortBy(SORTING.distance)}>
        <Icon type='environment'/> Distance <Icon type='down'/></Button>
    </div>
  );
}

SortingBlock.propTypes = {
  sorting: PropTypes.string.isRequired,
  sortBy: PropTypes.func.isRequired
};

const mapStateToProps = ({ui: {sorting}}) => ({sorting});

const mapDispatchToProps = {sortBy};

export default connect(mapStateToProps, mapDispatchToProps)(SortingBlock);