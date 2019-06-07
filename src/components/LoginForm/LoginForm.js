import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, Form, Icon, Input} from 'antd';
import {getArtistQty} from '../../api';
import {login} from '../../actions/user';
import {load} from '../../actions/data';

class LoginForm extends Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  };

  state = {
    checkingName: false,
    artistQty: null
  };

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
          placeholder="Songkick Username"
        />
      )}
    </Form.Item>;
  }

  renderArtistsQty() {
    const {artistQty} = this.state;
    if (artistQty === null) {
      return;
    }

    if (artistQty === 0) {
      return <Alert
        message={<span>
          You have no artists tracked on
          <a target='_blank'
             rel='noreferrer noopener'
             href="https://www.songkick.com/tracker/artists">Songkick</a>.
          Track some and try again!
           </span>
        }
        type="warning"
        showIcon/>;
    }

    const word = artistQty === 1 ? 'artist' : 'artists';
    const tracked = `You have ${artistQty} ${word} tracked.`;
    const conclusion = artistQty < 30 ?
      'It shouldn\'t be long!' :
      'It can take a while.';

    const {login, load, form: {getFieldValue}} = this.props;
    const username = getFieldValue('username');
    const loginData = {username, artistQty};

    return <div>
      <Alert
        message={`${tracked} ${conclusion}`}
        type="info"
        showIcon/>

      <Button type="primary" style={{marginTop: 20}}
              onClick={() => {
                login(loginData);
                load(loginData);
              }}>
        Let's go!
      </Button>
    </div>;
  }

  render() {

    return (
      <div style={{maxWidth: 400, margin: '0 auto'}}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          {this.renderInputField()}
          <Form.Item>
            <Button type="primary" htmlType="submit"
                    className="login-form-button"
                    disabled={this.state.checkingName}>
              Enter
            </Button>
          </Form.Item>
        </Form>

        <div style={{marginTop: 20}}>
          {this.renderArtistsQty()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {login, load};

const WrappedLoginForm = Form.create({name: 'LoginForm'})(LoginForm);

export default connect(null, mapDispatchToProps)(WrappedLoginForm);