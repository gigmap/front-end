// @flow

import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import LoadingOverlay from '../../common/loading-overlay/LoadingOverlay';
import Loading from '../../common/Loading';

const ConcertMap = React.lazy(() => import('../../concerts/map/ConcertMap'));

type Props = {
  loading: boolean
};

// TODO: show error

const ContentArea = (props: Props) => {
  return (
    <>
      {props.loading && <LoadingOverlay/>}

      <Suspense fallback={<Loading/>}>
        <ConcertMap/>
      </Suspense>
    </>
  );
};

const mapStateToProps =
  ({data: {loading, finished, error}}) => ({loading, finished, error});

export default connect(mapStateToProps)(React.memo(ContentArea));