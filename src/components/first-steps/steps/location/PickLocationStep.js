import React, {Suspense, useState} from 'react';
import {Button} from 'antd';
import {
  moveToNextStep, moveToPrevStep,
  updateUserData
} from '../../../../store/actions/first-steps';
import {connect} from 'react-redux';
import Loading from '../../../common/Loading';
import styles from '../steps.module.css';

const YandexMapLocationPicker =
  React.lazy(() => import('./YandexMapLocationPicker'));

function renderControls(location, proceed, skip, goBack) {
  return (
    <div className={styles.controls}>
      <Button type={'primary'} className={styles.button}
              onClick={proceed} disabled={!location}>
        Next
      </Button>
      <Button type={'dashed'} className={styles.button} onClick={skip}
              disabled={location}>
        Skip
      </Button>
      <Button className={styles.button} onClick={goBack}>
        Go back
      </Button>
    </div>
  );
}

function PickLocationStep(
  {currentLocation, updateUserData, moveToNextStep, moveToPrevStep}) {
  const [location, setLocation] = useState(currentLocation);

  const proceed = () => {
    updateUserData({location});
    moveToNextStep();
  };

  return (
    <>
      <Suspense fallback={<Loading/>}>
        <YandexMapLocationPicker setLocation={setLocation} location={location}/>
      </Suspense>
      {renderControls(location, proceed, moveToNextStep, moveToPrevStep)}
    </>
  );
}

const mapStateToProps =
  ({firstSteps: {data: {location}}}) => ({currentLocation: location});
const mapDispatchToProps = {updateUserData, moveToNextStep, moveToPrevStep};

export default connect(mapStateToProps, mapDispatchToProps)(PickLocationStep);