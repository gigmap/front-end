import React from 'react';
import {Button, Icon} from 'antd';
import {connect} from 'react-redux';
import {load} from '../../../../store/actions/data';
import {logout} from '../../../../store/actions/user';
import adaptive from '../../../../adaptive.module.less';
import style from './TempButtons.module.less';

const TempButtons = ({username, loading, logout, load}) => {
  return (
    <div className={style.wrapper}>
      <Button onClick={logout}>
        <Icon type='user'/> {username}: Log Out
      </Button>

      <Button style={{marginLeft: 10}} disabled={loading} onClick={() => load(false)}>
        <Icon type='reload'/>
        <span className={adaptive.fullscreenOnly}> Reload Concerts</span>
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