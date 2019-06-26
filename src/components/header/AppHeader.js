import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logout} from '../../store/actions/user';
import {load} from '../../store/actions/data';
import {toggleLocationDialog, toggleDateDialog} from '../../store/actions/ui';
import SkLogo from './powered-by-songkick-white.svg';
import React from 'react';
import {Button, Icon} from 'antd';
import styles from './AppHeader.module.css';
import LocationDialog from './location/LocationDialog';
import DateDialog from './dates/DateDialog';

function AppHeader({user, logout, load, loading, toggleLocationDialog, toggleDateDialog}) {
  let actionsBlock;


  if (user.name) {
    const renderDates = dates => {
      const {from, to} = dates;
      if (from === to) {
        return from;
      }

      return `${from}~${to}`;
    };

    actionsBlock = <div>
      <Button onClick={logout} className={styles.action}>
        <Icon type='user'/> <b>{user.name}</b>: Log Out
      </Button>

      <Button className={styles.action} disabled={loading} onClick={load}>
        <Icon type='reload'/> Reload Concerts
      </Button>

      <Button className={styles.action}
              onClick={() => toggleLocationDialog(true)}>
        <Icon type='environment'/> {user.location ? 'Change' : 'Where?'}
      </Button>

      <Button className={styles.action}
              onClick={() => toggleDateDialog(true)}>
        <Icon type='calendar'/> {user.dates ? renderDates(user.dates) : 'When?'}
      </Button>
    </div>;
  } else {
    actionsBlock = <div></div>;
  }

  return <div className={styles.header}>
    {actionsBlock}
    <a href='https://www.songkick.com/' rel='noopener noreferrer'
       target='_blank'>
      <img src={SkLogo} alt='Powered by Songkick.com' height='50px'/>
    </a>
    <LocationDialog />
    <DateDialog />
  </div>;
}

AppHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.object
  }).isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = ({user, data}) => ({user, loading: data.loading});

const mapDispatchToProps = {logout, load, toggleLocationDialog, toggleDateDialog};

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);