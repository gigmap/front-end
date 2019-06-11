import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Icon, Typography} from 'antd';
import FilterBlock from '../filters/FilterBlock';
import styles from './ConcertListControls.module.scss';
import {toggleFilters} from '../../actions/ui';

const {Title} = Typography;

function ConcertListControls({filtersOut, toggleFilters}) {
  const wrapperStyles = filtersOut ?
    styles.filterWrapper :
    [styles.filterWrapper, styles.collapsed].join(' ');

  return <div>
    <div style={{textAlign: 'center', marginBottom: 10}}>
      <Title level={4} style={{textTransform: 'uppercase'}}>Filters</Title>
    </div>
    <div className={wrapperStyles}>
      <FilterBlock/>
    </div>
    <div style={{textAlign: 'center'}}>
      <Button style={{width: '100%', textAlign: 'center'}}
              onClick={() => toggleFilters(!filtersOut)}>
        <Icon type={filtersOut ? 'up' : 'down'}/>
      </Button>
    </div>
  </div>;
}

ConcertListControls.propTypes = {
  filtersOut: PropTypes.bool.isRequired,
  toggleFilters: PropTypes.func.isRequired
};

const mapStateToProps = ({ui: {filtersOut}}) => ({filtersOut});
const mapDispatchToProps = {toggleFilters};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertListControls);