import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Button, Form, Icon, Input} from 'antd';
import {getArtistQty} from '../../api/gigmap';
import {login} from '../../store/actions/user';
import {load} from '../../store/actions/data';
import styles from './LoginForm.module.css';
import InitialLoadBlock from './InitialLoadBlock';

class LoginForm extends PureComponent {

  static propTypes = {
    login: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  };

  state = {
    checkingName: false,
    artistQty: null
  };

  renderInputField() {
    const {checkingName} = this.state;
    const {getFieldDecorator} = this.props.form;

    let validationProps = {};
    if (checkingName) {
      validationProps = {
        validateStatus: 'validating',
        hasFeedback: true
      };
    }

    return <Form.Item {...validationProps}>
      {getFieldDecorator('username', {
        rules: [{
          required: true,
          message: 'Please input your songkick username!'
        }]
      })(
        <Input
          prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
          placeholder="Songkick Username"/>
      )}
    </Form.Item>;
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {validateFields} = this.props.form;

    validateFields((err, values) => {
      if (!err) {
        const {username} = values;

        this.setState({checkingName: true, artistQty: null});
        getArtistQty(username)
          .then(data => {
            this.setState({checkingName: false, artistQty: data.qty});
          })
          .catch(e => {
            this.setState({checkingName: false});
            this.props.form.setFields({
              username: {
                value: username,
                errors: [new Error(e.message)]
              }
            });
          });
      }
    });
  };

  renderSubmitButton() {
    return <Form.Item>
      <Button type="primary" htmlType="submit"
              disabled={this.state.checkingName}>Enter</Button>
    </Form.Item>;
  }

  loadConcerts() {
    const {artistQty} = this.state;
    const {login, load, form: {getFieldValue}} = this.props;
    const username = getFieldValue('username');
    const loginData = {username, artistQty};

    login(loginData);
    load();
  }

  renderInitialLoadBlock() {
    const {artistQty} = this.state;
    if (artistQty === null) {
      return;
    }

    return <div style={{marginTop: 20}}>
      <InitialLoadBlock load={() => this.loadConcerts()}
                        artistQty={artistQty}/>
    </div>;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          {this.renderInputField()}
          {this.renderSubmitButton()}
        </Form>

        {this.renderInitialLoadBlock()}
      </div>
    );
  }
}

const mapDispatchToProps = {login, load};

const WrappedLoginForm = Form.create({name: 'LoginForm'})(LoginForm);

export default connect(null, mapDispatchToProps)(WrappedLoginForm);