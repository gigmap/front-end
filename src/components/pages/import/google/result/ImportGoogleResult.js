// @flow

import React from 'react';
import {connect} from 'react-redux';
import type {ImportResult} from '../../../../../store/reducers/import/google/types';
import {Alert, Tabs} from 'antd';
import {MemoImportGoogleResultList} from './list/ImportGoogleResultList';

const renderTab = (name, qty) => `${name} (${qty})`;

type ImportGoogleResultProps = {
  items: ImportResult | null,
  error: string | null
}

export const ImportGoogleResult = (props: ImportGoogleResultProps) => {
  const {items} = props;
  if (!items) {
    return null;
  }

  const {tracked, unknown, untracked} = items;
  if (tracked.length + unknown.length + untracked.length === 0) {
    return (
      <Alert message={'Sorry, no artists were found from your HTML code'}
             type={'info'} showIcon />
    );
  }

  return (
    <Tabs defaultActiveKey={'untracked'}>
      <Tabs.TabPane key={'untracked'}
                    tab={renderTab('Untracked', untracked.length)}>
        <MemoImportGoogleResultList items={untracked} />
      </Tabs.TabPane>
      <Tabs.TabPane key={'unknown'} tab={renderTab('Unknown', unknown.length)}>
        <MemoImportGoogleResultList items={unknown} />
      </Tabs.TabPane>
      <Tabs.TabPane key={'tracked'} tab={renderTab('Tracked', tracked.length)}>
        <MemoImportGoogleResultList items={tracked} />
      </Tabs.TabPane>
    </Tabs>
  );
};

const MemoImportGoogleResult = React.memo(ImportGoogleResult);

const mapStateToProps = (state) => ({
  items: state.artistImport.google.items
});

export const ConnectedImportGoogleResult =
  connect(mapStateToProps)(MemoImportGoogleResult);