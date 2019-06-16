import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Icon, Typography} from 'antd';
import FilterBlock from '../../filters/FilterBlock';
import styles from './ConcertListControls.module.scss';
import {toggleFilters} from '../../../actions/ui';
import SortingBlock from '../sorting/SortingBlock';

const {Title} = Typography;

function ConcertListControls({filtersOut, toggleFilters, location}) {
  const wrapperStyles = filtersOut ?
    styles.filterWrapper :
    [styles.filterWrapper, styles.collapsed].join(' ');

  const sortingBlock = location ? <SortingBlock/> : null;

  return <div>
    <div style={{textAlign: 'center', marginBottom: 10}}>
      <Title level={4} style={{textTransform: 'uppercase'}}>Filters & Sorting</Title>
    </div>
    <div className={wrapperStyles}>
      <FilterBlock/>
      {sortingBlock}
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
  location: PropTypes.object,
  toggleFilters: PropTypes.func.isRequired
};

const mapStateToProps =
  ({ui: {filtersOut}, user: {location}}) => ({filtersOut, location});
const mapDispatchToProps = {toggleFilters};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertListControls);