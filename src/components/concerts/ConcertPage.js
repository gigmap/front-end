import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, Divider, Spin} from 'antd';
import {load} from '../../actions/data';
import ConcertList from './ConcertList';
import ConcertListControls from './ConcertListControls';

class ConcertPage extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      finished: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired,
    load: PropTypes.func.isRequired
  };

  renderLoading() {
    return <div style={{textAlign: 'center'}}>
      <Spin size="large" tip="Loading artists and concerts..."/>
    </div>;
  }

  renderError(error) {
    const {load, username} = this.props;

    const notice = error ?
      <Alert type='error' showIcon
             message={<div>An error happened during concert loading:<br/>{error}</div>}
      /> :
      <Alert type='warning' showIcon
             message='Somehow concerts are not loaded.'/>;

    const button =
      <Button type='primary' style={{marginTop: 20}}
              onClick={() => load({username})}>Try Again</Button>;

    return <div>
      {notice}
      {button}
    </div>;
  }

  renderData() {
    return <div>
      <ConcertListControls/>
      <Divider />
      <ConcertList />
    </div>;
  }

  render() {
    const {data: {loading, finished, error}} = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (!finished || error) {
      return this.renderError(error);
    }

    return this.renderData();
  }
}

const mapStateToProps = ({user, data}) => ({username: user.name, data});
const mapDispatchToProps = {load};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertPage);