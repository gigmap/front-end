import React, {Suspense} from 'react';
import TempButtons from './TempButtons';
import {Divider} from 'antd';
import LoadingOverlay from '../../common/loading-overlay/LoadingOverlay';

const FilterForm = React.lazy(() => import('../../filters/FilterForm'));

const SideControls = () => {
  return (
    <>
      <TempButtons/>
      <Divider/>

      <Suspense fallback={<LoadingOverlay/>}>
        <FilterForm/>
      </Suspense>
    </>
  );
};

export default SideControls;