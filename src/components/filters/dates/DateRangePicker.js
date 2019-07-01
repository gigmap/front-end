import React from 'react';
import * as PropTypes from 'prop-types';
import {Alert, DatePicker} from 'antd';
import moment from 'moment';

const {RangePicker} = DatePicker;

const RANGE_WARNING = `Please think carefully before selecting a wide 
date range (more than 3 months). 
It can be really slow if you have a lot of bands tracked.`;

const PRESET_RANGES = {
  Today: [moment(), moment()],
  Week: [moment(), moment().add(1, 'week')],
  Month: [moment(), moment().add(1, 'month')],
  '2 months': [moment(), moment().add(2, 'month')],
  '3 months': [moment(), moment().add(3, 'month')]
};

function isDateDisabled(date: moment.Moment): boolean {
  if (!date) {
    return false;
  }

  return date < moment().startOf('day');
}

const renderWarning = () => (
  <Alert message={RANGE_WARNING}
         type={'warning'}
         showIcon
         style={{margin: '10px 0'}}/>
);

function DateRangePicker({defaultValues, setSelectedDates}) {

  const handleRangeSelected = (dates) => setSelectedDates(dates);

  // TODO: bug with value after logout
  return (
    <>
      <RangePicker
        defaultValue={defaultValues}
        // value={selectedDates}
        disabledDate={isDateDisabled}
        onChange={handleRangeSelected}
        ranges={PRESET_RANGES}
        renderExtraFooter={renderWarning}
      />
    </>
  );
}

const MemoDateRangePicker = React.memo(DateRangePicker);

MemoDateRangePicker.propTypes = {
  defaultValues: PropTypes.array,
  setSelectedDates: PropTypes.func.isRequired
};

export default MemoDateRangePicker;