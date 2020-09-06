import React from 'react';
import {Button, Checkbox, Dropdown, Icon, Menu, Tooltip} from 'antd';
import {connect} from 'react-redux';
import {load} from '../../../../store/actions/data';
import {logout} from '../../../../store/actions/user';
import style from './TempButtons.module.less';
import {toggleItem} from '../../../../store/actions/filters';
import {GoingIcon, InterestedIcon} from '../../../common/icons/AttendanceIcon';
import {EVENT_OPTIONS_FILTER_KEY} from '../../../../store/reducers/Constants';
import {getEventOptionsFilterState} from '../../../filters/selectors/filterState';
import type {EventOptionsFilter} from '../../../../store/reducers/filters/selected';

const getMenuItemBuilder = (eventOptions: EventOptionsFilter, toggleFor) =>
  (id, icon, title) => (
    <Menu.Item disabled key={id} className={style.displayMenuItem}>
      <Checkbox checked={eventOptions[id]} onChange={toggleFor(id)}>
        Show {title || id}
        {icon}
      </Checkbox>
    </Menu.Item>
  );

const getSettingsMenu = (eventOptions: EventOptionsFilter, toggleFor) => {
  const items = [
    ['going', <GoingIcon />],
    ['interested', <InterestedIcon />],
    ['noAttendance', null, 'others']
  ];
  const build = getMenuItemBuilder(eventOptions, toggleFor);
  return (
    <Menu>
      {items.map(props => build(...props))}
    </Menu>
  );
};

const ControlButtons = ({username, loading, eventOptions, logout, load, toggleItem}) => {
  const reload = () => load(false);
  const toggleFor = (id) =>
    () => toggleItem(EVENT_OPTIONS_FILTER_KEY, id, !eventOptions[id]);

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

      {/*
       Probably an AntD bug: if Menu is wrapped into a react component for "overlay"
       property, the dropdown style won't apply and layout would be wrong.
       TODO: try thins with the latest (>4.x) AntD
      */}
      <Dropdown trigger={['click']}
                overlay={getSettingsMenu(eventOptions, toggleFor)}>
        <Tooltip title={'Display Settings'}>
          <Button icon={'setting'} className={style.reload} />
        </Tooltip>
      </Dropdown>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.user.name,
  loading: state.data.loading,
  eventOptions: getEventOptionsFilterState(state)
});

const mapDispatchToProps = {
  logout,
  load,
  toggleItem
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlButtons);