// @flow
import React from 'react';
import {SecondaryPageLayout} from '../../../layout/secondary-page/SecondaryPageLayout';
import {ImportGoogleManual} from './manual/ImportGoogleManual';
import {ConnectedImportGoogleForm} from './form/ImportGoogleForm';
import {ConnectedImportGoogleResult} from './result/ImportGoogleResult';

export const ImportGooglePage = () => {
  return (
    <SecondaryPageLayout title={'Import from Google Music'}>
      <ImportGoogleManual/>
      <ConnectedImportGoogleForm/>
      <ConnectedImportGoogleResult/>
    </SecondaryPageLayout>
  );
};

export default ImportGooglePage;