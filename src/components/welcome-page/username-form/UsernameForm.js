// @flow

import React, {useState} from 'react';
import {Icon, Form, Input, Button} from 'antd';
import {connect} from 'react-redux';
import * as ReactGA from 'react-ga';
import {getArtistQty} from '../../../api/gigmap/gigmap';
import {UsernameCheckResults} from './UsernameCheckResults';
import {login} from '../../../store/actions/user';
import {load} from '../../../store/actions/data';
import {EVENTS} from '../../../constants/Tracking';
import styles from './EnterUsername.module.css';

// TODO: needs refactoring

const NAME_FIELD = 'username';

function renderInputField(form: Object, nameLoading: boolean) {
  const {getFieldDecorator} = form;
  const validationProps = nameLoading ? { // for a spinner near the field
    validateStatus: 'validating',
    hasFeedback: true
  } : {};

  return (
    <Form.Item {...validationProps}>
      {getFieldDecorator(NAME_FIELD, {
        rules: [{
          required: true,
          message: 'Please input your songkick username'
        }]
      })(
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder="Songkick Username"/>
      )}
    </Form.Item>
  );
}

function renderSubmitButton(nameLoading) {
  return <Form.Item>
    <Button type="primary" htmlType="submit"
            disabled={nameLoading}>Enter</Button>
  </Form.Item>;
}

const createSubmitHandler =
  (form, setNameLoading, setArtistQty) => (e) => {
    e.preventDefault();
    form.validateFields((err, {username}) => {
      if (err) {
        return;
      }

      setNameLoading(true);
      setArtistQty(null);
      getArtistQty(username)
        .then(data => {
          setNameLoading(false);
          setArtistQty(data.qty);
        })
        .catch(e => {
          setNameLoading(false);
          form.setFields({
            username: {
              value: username,
              errors: [new Error(e.message)]
            }
          });
        });
    });
  };

function renderControls(artistQty, proceed) {
  const nextDisabled = artistQty === null || artistQty === 0;

  return (
    <div className={styles.controls}>
      <Button type={'default'} className={styles.button} onClick={proceed}
              disabled={nextDisabled}>
        Log in
      </Button>
    </div>
  );
}

type Props = {
  form: Form,
  login: Function,
  load: Function
};

function UsernameForm({form, login, load}: Props) {

  const {getFieldValue} = form;
  const [nameLoading, setNameLoading] = useState(false);
  const [artistQty, setArtistQty] = useState(null);

  const proceed = () => {
    ReactGA.event({
      category: EVENTS.User.category,
      action: EVENTS.User.actions.SongkickAuthorized
    });
    login(getFieldValue(NAME_FIELD));
    load(true);
  };
  const handleSubmit =
    createSubmitHandler(form, setNameLoading, setArtistQty);
  return (
    <>
      <Form layout="inline" onSubmit={handleSubmit}>
        {renderInputField(form, nameLoading)}
        {renderSubmitButton(nameLoading)}
      </Form>
      {artistQty !== null && <UsernameCheckResults artistQty={artistQty}/>}
      {renderControls(artistQty, proceed)}
    </>
  );
}

const mapDispatchToProps = {login, load};

export const ConnectedUsernameForm = connect(null, mapDispatchToProps)(
  Form.create({name: 'UsernameForm'})(UsernameForm)
);