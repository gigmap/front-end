// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, DatePicker, Modal} from 'antd';
import moment from 'moment';
import {toggleDateDialog} from '../../../store/actions/ui';
import {setDates} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';
import {getUserWithMoment} from './selectors/getUserWithMomentDates';

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

function DateDialog({isOpen, dates, toggle, setDates, load}) {

  const defaultValues = dates ? [dates.from, dates.to] : [];
  const [selectedDates, setSelectedDates] = useState(defaultValues);

  const close = () => toggle(false);
  const confirm = () => {
    if (dates &&
      dates.from.isSame(selectedDates[0]) && dates.to.isSame(selectedDates[1])) {
      console.debug('Dates havent changed');
      return close();
    }

    setDates(selectedDates);
    load();
    close();
  };

  const footer = [
    <Button key='back' onClick={close}>
      Cancel
    </Button>,
    <Button key='submit' type='primary' onClick={confirm}
            disabled={selectedDates.length < 2}>
      Confirm & Reload
    </Button>
  ];

  const handleRangeSelected = (dates) => setSelectedDates(dates);

  return (
    <Modal title="Select time period" visible={isOpen} footer={footer}>
      <RangePicker
        defaultValue={defaultValues}
        // value={selectedDates} // TODO: bug with value after logout
        disabledDate={isDateDisabled}
        onChange={handleRangeSelected}
        ranges={PRESET_RANGES}
      />

      <Alert message={RANGE_WARNING}
             type={'warning'}
             showIcon
             style={{marginTop: 20}}/>

    </Modal>
  );
}

DateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dates: PropTypes.object,
  toggle: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired
};

const MemoDateDialog = React.memo(DateDialog);

const mapStateToProps = (state) => ({
  isOpen: state.ui.dateDialogOpen,
  dates: getUserWithMoment(state).dates
});

const mapDispatchToProps = {
  load,
  setDates,
  toggle: toggleDateDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoDateDialog);