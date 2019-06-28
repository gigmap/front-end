import React from 'react';
import {Steps, Icon, Typography} from 'antd';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import WelcomeText from './WelcomeText';
import EnterUsernameStep from './steps/username/EnterUsernameStep';
import PickLocationStep from './steps/location/PickLocationStep';
import PickDatesStep from './steps/dates/PickDatesStep';

const {Title} = Typography;
const {Step} = Steps;

const STEPS = [
  <EnterUsernameStep/>,
  <PickLocationStep/>,
  <PickDatesStep/>
];


function FirstSteps({step, name}) {

  const getStatus = (i) => {
    if (i < step) {
      return 'finish';
    }

    return i === step ? 'process' : 'wait';
  };

  return (
    <>
      <Typography>
        <Title>Welcome to Gig Map!</Title>
        <WelcomeText/>

        <Title level={2}>Let's roll!</Title>
        <Steps current={step}>
          <Step status={getStatus(0)} title={name || 'Username'}
                icon={<Icon type="user"/>}/>
          <Step status={getStatus(1)} title="Location"
                icon={<Icon type="environment"/>}/>
          <Step status={getStatus(2)} title="Dates"
                icon={<Icon type="calendar"/>}/>
        </Steps>
        <div style={{marginTop: 10}}>
          {STEPS[step]}
        </div>
      </Typography>
    </>
  );
}

FirstSteps.propTypes = {
  step: PropTypes.number.isRequired,
  name: PropTypes.string
};

const mapStateToProps = ({firstSteps: {step, data: {name}}}) => ({step, name});

export default connect(mapStateToProps)(FirstSteps);