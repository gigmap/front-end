// @flow

import React, {useState} from 'react';
import {Icon, Form, Input, Button} from 'antd';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {getArtistQty} from '../../../../api/gigmap';
import UsernameCheckResults from './UsernameCheckResults';
import {
  moveToNextStep,
  updateUserData
} from '../../../../store/actions/first-steps';
import {login} from '../../../../store/actions/user';
import {load} from '../../../../store/actions/data';
import styles from '../steps.module.css';

// TODO: needs refactoring

function renderInputField(form: Object, currentName: string, nameLoading: boolean) {
  const {getFieldDecorator} = form;
  const validationProps = nameLoading ? { // for a spinner near the field
    validateStatus: 'validating',
    hasFeedback: true
  } : {};

  return (
    <Form.Item {...validationProps}>
      {getFieldDecorator('username', {
        initialValue: currentName,
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
  (form, setNameLoading, setArtistQty, updateUserData) => (e) => {
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
          if (data.qty > 0) {
            updateUserData({name: username});
          }
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

function renderControls(artistQty, moveToNextStep, proceed) {
  const nextDisabled = artistQty === null || artistQty === 0;

  return (
    <div className={styles.controls}>
      <Button type={'primary'} className={styles.button}
              onClick={moveToNextStep} disabled={nextDisabled}>
        Next
      </Button>
      <Button type={'default'} className={styles.button} onClick={proceed}
              disabled={nextDisabled}>
        Skip the rest and log in
      </Button>
    </div>
  );
}

function EnterUsernameStep({form, currentName, updateUserData, moveToNextStep, login, load}) {

  const [nameLoading, setNameLoading] = useState(false);
  const [artistQty, setArtistQty] = useState(null);

  const proceed = () => {
    login();
    load();
  };
  const handleSubmit =
    createSubmitHandler(form, setNameLoading, setArtistQty, updateUserData);
  return (
    <>
      <Form layout="inline" onSubmit={handleSubmit}>
        {renderInputField(form, currentName, nameLoading)}
        {renderSubmitButton(nameLoading)}
      </Form>
      {artistQty !== null && <UsernameCheckResults artistQty={artistQty}/>}
      {renderControls(artistQty, moveToNextStep, proceed)}
    </>
  );
}

EnterUsernameStep.propTypes = {
  form: PropTypes.object.isRequired,

  updateUserData: PropTypes.func.isRequired,
  moveToNextStep: PropTypes.func.isRequired
};

const mapStateToProps = ({firstSteps: {data: {name}}}) => ({currentName: name});
const mapDispatchToProps = {updateUserData, moveToNextStep, login, load};

const WrappedLoginForm = Form.create({name: 'EnterUsernameStep'})(EnterUsernameStep);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);