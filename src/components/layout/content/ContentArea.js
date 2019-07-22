// @flow

import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from '../../common/loading-overlay/LoadingOverlay';
import Loading from '../../common/Loading';
import {Alert, Button} from 'antd';
import {isAuthenticated} from '../../../store/selectors/user';

const ConcertMap = React.lazy(() => import('../../concerts/map/ConcertMap'));
const WelcomePage = React.lazy(() => import('../../welcome-page/WelcomePage'));

type ContentAreaProps = {
  authenticated: boolean,
  loading: boolean
};

// TODO: show error
// TODO (implement)   if (!finished || error) {
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

export const ContentArea = (props: ContentAreaProps) => {
  const {authenticated, loading} = props;

  return (
    <>
      {loading && <LoadingOverlay/>}

      <Suspense fallback={<Loading/>}>
        {
          authenticated ?
            <ConcertMap/> :
            <WelcomePage/>
        }
      </Suspense>
    </>
  );
};

const mapStateToProps = (state) =>
  ({
    loading: state.data.loading,
    finished: state.data.finished,
    error: state.data.error,
    authenticated: isAuthenticated(state)
  });

export const ConnectedContentArea = connect(mapStateToProps)(ContentArea);