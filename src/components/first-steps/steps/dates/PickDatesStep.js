import React, {useState} from 'react';
import {Button} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  moveToPrevStep,
  updateUserData
} from '../../../../store/actions/first-steps';
import DateRangePicker from '../../../filters/dates/DateRangePicker';
import {login} from '../../../../store/actions/user';
import {load} from '../../../../store/actions/data';
import styles from '../steps.module.css';

function renderControls(dates, proceed, goBack) {
  return (
    <div className={styles.controls}>
      <Button type={'primary'} className={styles.button} onClick={proceed}>
        Show me the gigs!
      </Button>
      <Button className={styles.button} onClick={goBack}>
        Go back
      </Button>
    </div>
  );
}

function PickDatesStep(
  {currentDates, updateUserData, moveToPrevStep, login, load}) {

  const defaultValues = currentDates ?
    [moment(currentDates.from), moment(currentDates.to)] : [];

  const [dates, setDates] = useState(defaultValues);

  const proceed = () => {
    updateUserData({dates});
    login();
    load();
  };

  return (
    <>
      <DateRangePicker setSelectedDates={setDates}
                       defaultValues={defaultValues}/>
      {renderControls(dates, proceed, moveToPrevStep)}
    </>
  );
}

const mapStateToProps =
  ({firstSteps: {data: {dates}}}) => ({currentDates: dates});

const mapDispatchToProps = {updateUserData, moveToPrevStep, login, load};

export default connect(mapStateToProps, mapDispatchToProps)(PickDatesStep);