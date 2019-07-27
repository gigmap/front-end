// @flow
import * as React from 'react';
import {Button, Layout} from 'antd';
import classNames from 'classnames';
import {connect} from 'react-redux';
import adaptive from '../../../../adaptive.module.less';
import styles from './MobileHeader.module.less';
import HeaderArea from '../../header/HeaderArea';
import {toggleMobileSidebar} from '../../../../store/actions/ui';
import {isAuthenticated} from '../../../../store/selectors/user';

const {Header} = Layout;

type MobileSidebarProps = {
  isSidebarShown: boolean,
  isAuthenticated: boolean,
  toggleSidebar: Function
};

export const MobileHeader = (props: MobileSidebarProps) => {
  const {isSidebarShown, isAuthenticated, toggleSidebar} = props;
  const icon = isSidebarShown ? 'menu-fold' : 'menu-unfold';

  return (
    <Header className={classNames(styles.overallHeader, adaptive.mobileOnly)}>
      <Button type={'primary'} icon={icon} onClick={toggleSidebar}
              disabled={!isAuthenticated}/>
      <HeaderArea/>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  isSidebarShown: state.ui.mobile.sidebarShown,
  isAuthenticated: isAuthenticated(state)
});

const mapDispatchToProps = {toggleSidebar: toggleMobileSidebar};

export const ConnectedMobileHeader =
  connect(mapStateToProps, mapDispatchToProps)(MobileHeader);