import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Modal} from 'antd';
import {toggleDateDialog} from '../../../store/actions/ui';
import {setDates} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';
import {getUserWithMoment} from './selectors/getUserWithMomentDates';
import DateRangePicker from './DateRangePicker';

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

  return (
    <Modal title="Select time period" visible={isOpen} footer={footer} onCancel={close}>
      <DateRangePicker setSelectedDates={setSelectedDates} defaultValues={defaultValues} />
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