// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Modal, Button, DatePicker, Alert} from 'antd';
import moment from 'moment';
import {toggleDateDialog} from '../../../store/actions/ui';
import {setDates, unsetDates} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';

const {RangePicker} = DatePicker;

// TODO: load from config or env
const MAX_DAYS = 90;

const PRESET_RANGES = {
  Today: [moment(), moment()],
  Week: [moment(), moment().add(1, 'week')],
  Month: [moment(), moment().add(1, 'month')]
};

function isDateAvailable(
  date: moment.Moment,
  firstPickedDate: moment.Moment): boolean {

  if (!date) {
    return false;
  }

  const isInThePast = date < moment().startOf('day');
  if (!firstPickedDate) {
    return isInThePast;
  }

  const diff = Math.abs(date.diff(firstPickedDate, 'days'));

  return isInThePast || diff > MAX_DAYS;
}

function DateDialog({isOpen, dates, toggle, setDates, unsetDates, load}) {

  const defaultValues = dates ? [moment(dates.from), moment(dates.to)] : [];

  const [firstDate, setFirstDate] = useState(null);
  const [selectedDates, setSelectedDates] = useState(defaultValues);

  const close = () => toggle(false);
  const disabledDate = (current) => isDateAvailable(current, firstDate);
  const unset = () => {
    unsetDates();
    load();
    close();
  };
  const confirm = () => {
    setDates(selectedDates.map((it: moment.Moment) => it.format('YYYY-MM-DD')));
    load();
    close();
  };

  const footer = [
    <Button key='unset' type='danger' onClick={unset} disabled={!dates}>
      Unset
    </Button>,
    <Button key='back' onClick={close}>
      Cancel
    </Button>,
    <Button key='submit' type='primary' onClick={confirm}
            disabled={selectedDates.length < 2}>
      Confirm & Reload
    </Button>
  ];

  const handleRangeSelected = (dates) => setSelectedDates(dates);
  const resetSelected = () => setFirstDate(null);
  const handleSelectionChange = (values) => {
    if (values.length === 1) {
      setFirstDate(values[0]);
    }
  };

  return (
    <Modal title="Select time period" visible={isOpen} footer={footer}>
      <RangePicker
        defaultValue={defaultValues}
        // value={selectedDates} // TODO: bug with value after logout
        disabledDate={disabledDate}
        onChange={handleRangeSelected}
        onOpenChange={resetSelected}
        onCalendarChange={handleSelectionChange}
        ranges={PRESET_RANGES}
      />

      <Alert message={`Maximum time period is ${MAX_DAYS} days for now`}
             type={'info'}
             style={{marginTop: 20}}/>

    </Modal>
  );
}

DateDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dates: PropTypes.object,
  toggle: PropTypes.func.isRequired,
  setDates: PropTypes.func.isRequired,
  unsetDates: PropTypes.func.isRequired,
  load: PropTypes.func.isRequired
};

const MemoDateDialog = React.memo(DateDialog);

const mapStateToProps = ({ui, user: {dates}}) =>
  ({isOpen: ui.dateDialogOpen, dates});

const mapDispatchToProps = {
  load,
  setDates,
  unsetDates,
  toggle: toggleDateDialog
};

export default connect(mapStateToProps, mapDispatchToProps)(MemoDateDialog);