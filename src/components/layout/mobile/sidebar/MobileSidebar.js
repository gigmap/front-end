// @flow
import * as React from 'react';
import {Layout} from 'antd';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {ConnectedSideControls} from '../../siderbar/parts/SideControls';
import adaptive from '../../../../adaptive.module.less';
import style from './MobileSidebar.module.less';

const {Content} = Layout;

type MobileSidebarProps = {
  isShown: boolean
};

export const MobileSidebar = (props: MobileSidebarProps) => {
  const mobileFiltersClasses = classNames(
    style.mobileFilters, adaptive.mobileOnly, {[style.showFilters]: props.isShown});

  return (
    <Layout className={mobileFiltersClasses}>
      <Content>
        <ConnectedSideControls/>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  isShown: state.ui.mobile.sidebarShown
});

export const ConnectedMobileSidebar = connect(mapStateToProps)(MobileSidebar);