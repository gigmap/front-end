// @flow

import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from '../../common/loading-overlay/LoadingOverlay';
import Loading from '../../common/loading/Loading';
import {Alert, Button} from 'antd';
import {isAuthenticated} from '../../../store/reducers/user/selectors';
import {load} from '../../../store/actions/data';
import styles from './ContentArea.module.less';

const ConcertMap = React.lazy(() => import('../../concerts/map/ConcertMap'));
const WelcomePage = React.lazy(() => import('../../welcome-page/WelcomePage'));

type ContentAreaProps = {
  authenticated: boolean,
  finished: boolean,
  error: string,
  loading: boolean,
  load: Function
};

// TODO: rework error detecting and rendering
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
    <Button type='primary' className={styles.button} onClick={() => load(true)}>
      Try Again
    </Button>;

  return <div className={styles.errorWrapper}>
    <div>
      {notice}
      {button}
    </div>
  </div>;
};

function renderContent(props: ContentAreaProps) {
  const {authenticated, finished, error, load, loading} = props;

  if (!authenticated) {
    return <Suspense fallback={<Loading/>}>
      <WelcomePage/>
    </Suspense>;
  }

  if (!loading && (!finished || error)) {
    return renderError(error, load);
  }

  return (
    <Suspense fallback={<Loading/>}>
      <ConcertMap/>
    </Suspense>
  );
}

export const ContentArea = (props: ContentAreaProps) => {
  const {loading} = props;

  return (
    <>
      {loading && <LoadingOverlay/>}
      {renderContent(props)}
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

const mapDispatchToProps = {load};

export const ConnectedContentArea =
  connect(mapStateToProps, mapDispatchToProps)(ContentArea);