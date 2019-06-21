// @flow

import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, Divider, Spin} from 'antd';
import {load} from '../../store/actions/data';
import ConcertListControls from './ConcertListControls';
import ConcertTabs from './ConcertTabs';

const renderLoading = () => {
  return <div style={{textAlign: 'center'}}>
    <Spin size="large" tip="Loading artists and concerts..."/>
  </div>;
};

const renderError = (error: string, username: string, load: Function) => {

  const notice = error ?
    <Alert type='error' showIcon
           message={
             <div>An error happened during concert loading:<br/>{error}</div>
           }
    /> :
    <Alert type='warning' showIcon
           message='Somehow concerts are not loaded.'/>;

  const button =
    <Button type='primary' style={{marginTop: 20}}
            onClick={() => load({username})}>Try Again</Button>;

  return <>
    {notice}
    {button}
  </>;
};

const renderData = () => {
  return <>
    <ConcertListControls/>
    <Divider/>
    <ConcertTabs/>
  </>;
};

const ConcertPage = ({loading, finished, error, username, load}) => {

  if (loading) {
    return renderLoading();
  }

  if (!finished || error) {
    return renderError(error, username, load);
  }

  return renderData();
};

ConcertPage.propTypes = {
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  error: PropTypes.string,
  load: PropTypes.func.isRequired
};

const mapStateToProps = ({user, data: {loading, finished, error}}) =>
  ({username: user.name, loading, finished, error});
const mapDispatchToProps = {load};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertPage);