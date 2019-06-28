// @flow

import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, Divider} from 'antd';
import {load} from '../../store/actions/data';
import ConcertTabs from './ConcertTabs';
import Loading from '../common/Loading';

const LazyConcertListControls = React.lazy(() => import('./ConcertListControls'));

const renderError = (error: string, load: Function) => {

  const notice = error ?
    <Alert type='error' showIcon
           message={
             <div>An error happened during concert loading:<br/>{error}</div>
           }
    /> :
    <Alert type='warning' showIcon
           message='Somehow concerts are not loaded.'/>;

  const button =
    <Button type='primary' style={{marginTop: 20}} onClick={load}>
      Try Again
    </Button>;

  return <>
    {notice}
    {button}
  </>;
};

const renderData = () => {
  return <>
    <Suspense fallback={<Loading/>}>
      <LazyConcertListControls/>
    </Suspense>
    <Divider/>
    <ConcertTabs/>
  </>;
};

const ConcertPage = ({loading, finished, error, load}) => {

  if (loading) {
    return (
      <Loading tip={'Loading concerts and artists'}/>
    );
  }

  if (!finished || error) {
    return renderError(error, load);
  }

  return renderData();
};

ConcertPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  finished: PropTypes.bool.isRequired,
  error: PropTypes.string,
  load: PropTypes.func.isRequired
};

const mapStateToProps =
  ({data: {loading, finished, error}}) => ({loading, finished, error});
const mapDispatchToProps = {load};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertPage);