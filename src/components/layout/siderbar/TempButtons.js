import React from 'react';
import {Button, Icon} from 'antd';
import {connect} from 'react-redux';
import {load} from '../../../store/actions/data';
import {logout} from '../../../store/actions/user';

const TempButtons = ({username, loading, logout, load}) => {
  return (
    <div>
      <Button onClick={logout}>
        <Icon type='user'/> {username}: Log Out
      </Button>

      <Button style={{marginLeft: 10}} disabled={loading} onClick={load}>
        <Icon type='reload'/> Reload Concerts
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.name,
  loading: state.data.loading
});

const mapDispatchToProps = {
  logout,
  load
};

export default connect(mapStateToProps, mapDispatchToProps)(TempButtons);