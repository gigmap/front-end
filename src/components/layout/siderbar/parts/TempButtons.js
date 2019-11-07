import React from 'react';
import {Button, Icon, Tooltip} from 'antd';
import {connect} from 'react-redux';
import {load} from '../../../../store/actions/data';
import {logout} from '../../../../store/actions/user';
import style from './TempButtons.module.less';

const TempButtons = ({username, loading, logout, load}) => {
  const reload = () => load(false);

  return (
    <div className={style.wrapper}>
      <Button onClick={logout}>
        <Icon type='user' /> {username}: Log Out
      </Button>

      <Tooltip title={'Reload Concerts'}>
        <Button icon={'reload'}
                className={style.reload} disabled={loading} onClick={reload}>
        </Button>
      </Tooltip>
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