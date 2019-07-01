// @flow

import React from 'react';
import {connect} from 'react-redux';
import FilterBlock from './block/FilterBlock';
import DateFilter from './dates/DateFilter';
import {load} from '../../store/actions/data';
import style from './FilterForm.module.less';
import ArtistFilter from './artists/ArtistFilter';
import CountryFilter from './countries/CountryFilter';
import LoadingOverlay from '../common/loading-overlay/LoadingOverlay';

type FilterFormProps = {
  loading: boolean,
  load: Function
};

const FilterForm = (props: FilterFormProps) => {
  const {loading} = props;

  return (
    <div className={style.wrapper}>
        <FilterBlock title={'Select dates'}>
          <DateFilter/>
        </FilterBlock>

        <FilterBlock title={'Select artists'}>
          <ArtistFilter/>
        </FilterBlock>

        <FilterBlock title={'Select countries'}>
          <CountryFilter/>
        </FilterBlock>

      {loading && <LoadingOverlay/>}
    </div>
  );
};

const MemoFilterForm = React.memo(FilterForm);

const mapStateToProps = ({data: {loading}}) => ({loading});

const mapDispatchToProps = {load};

export default connect(mapStateToProps, mapDispatchToProps)(MemoFilterForm);