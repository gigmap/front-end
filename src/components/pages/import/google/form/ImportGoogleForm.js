// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as ReactGA from 'react-ga';
import {uploadGoogleData} from '../../../../../store/actions/import';
import {Button, Form, Input, Spin} from 'antd';
import {RequestError} from '../../../../common/request-error/RequestError';
import styles from './ImportGoogleForm.module.less';
import {EVENTS} from '../../../../../constants/Tracking';

type ImportGoogleFormProps = {
 loading: boolean,
  error: string | null,
  username: string,
  uploadGoogleData: Function
};

export const ImportGoogleForm = (props: ImportGoogleFormProps) => {
  const {error, loading, uploadGoogleData, username} = props;

  const [html, setHtml] = useState('');
  const onChange = (e) => setHtml(e.target.value);
  const onSubmit = (e) => {
    e.target.blur();
    e.preventDefault();
    ReactGA.event({
      category: EVENTS.Features.category,
      action: EVENTS.Features.actions.GoogleImportUsed
    });
    uploadGoogleData(username, html);
  };

 return (
    <Form onSubmit={onSubmit}>
      <Form.Item label={'Code from Google'}>
        <Input.TextArea rows={6} onChange={onChange} disabled={loading} value={html} />
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} htmlType={'submit'} disabled={loading || !html}>
          Submit
        </Button>
        {loading && <Spin className={styles.loading} size={'small'} />}
      </Form.Item>
      <RequestError className={styles.error} error={error}/>
   </Form>
 );
};

const MemoImportGoogleForm = React.memo(ImportGoogleForm);

const mapStateToProps = (state) => ({
  username: state.user.name,
  loading: state.artistImport.google.loading,
  error: state.artistImport.google.error
});

const mapDispatchToProps = {uploadGoogleData};

export const ConnectedImportGoogleForm =
  connect(mapStateToProps, mapDispatchToProps)(MemoImportGoogleForm);