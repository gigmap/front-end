// @flow

import React, {Suspense} from 'react';
import {connect} from 'react-redux';
import TempButtons from './TempButtons';
import {Divider} from 'antd';
import LoadingOverlay from '../../../common/loading-overlay/LoadingOverlay';
import {isAuthenticated} from '../../../../store/selectors/user';
import {ConnectedMobileNavLinks} from '../../mobile/nav-links/MobileNavLinks';
import styles from './SideControls.module.less';

const FilterForm = React.lazy(() => import('../../../filters/FilterForm'));

type SideControlsProps = {
  authenticated: boolean
}

export const SideControls = (props: SideControlsProps) => {
  if (!props.authenticated) {
    return null;
  }

  return (
    <>
      <div className={styles.navigation}>
        <ConnectedMobileNavLinks />
        <Divider />
      </div>

      <TempButtons />
      <Divider />

      <Suspense fallback={<LoadingOverlay />}>
        <FilterForm />
      </Suspense>
    </>
  );
};

const mapStateToProps = (state) => ({authenticated: isAuthenticated(state)});

export const ConnectedSideControls = connect(mapStateToProps)(SideControls);