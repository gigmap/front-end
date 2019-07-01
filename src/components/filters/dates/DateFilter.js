// @flow

import React from 'react';
import DateRangePicker from './DateRangePicker';
import {getUserWithMoment} from '../../_old/header/dates/selectors/getUserWithMomentDates';
import {setDates} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';
import {connect} from 'react-redux';
import type {DateRange} from '../../../types';

type DateFilterProps = {
  dates: ?DateRange,
  setDates: Function,
  load: Function
};

const DateFilter = (props: DateFilterProps) => {
  const {dates, setDates, load} = props;
  const defaultValues = dates ? [dates.from, dates.to] : [];

  const onSelect = (dates) => {
    setDates(dates);
    load();
  };

  return (
    <DateRangePicker setSelectedDates={onSelect} defaultValues={defaultValues}/>
  );
};

const MemoDateFilter = React.memo(DateFilter);

const mapStateToProps = (state) => ({
  dates: getUserWithMoment(state).dates
});

const mapDispatchToProps = {
  setDates, load
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoDateFilter);