// @flow
import * as React from 'react';
import classNames from 'classnames';
import {Layout} from 'antd';
import HeaderArea from '../header/HeaderArea';
import {ConnectedSideControls} from './parts/SideControls';
import styles from './FullscreenSidebar.module.less';
import adaptive from '../../../adaptive.module.less';

const {Sider, Header, Content} = Layout;

export const FullscreenSidebar = () => {
  return (
    <Sider className={classNames(styles.sidebar, adaptive.fullscreenOnly)}
           width={400}>
      <Layout className={styles.sidebarLayout}>
        <Header className={styles.header}>
          <HeaderArea/>
        </Header>

        <Content className={styles.controls}>
          <ConnectedSideControls/>
        </Content>
      </Layout>

    </Sider>
  );
};