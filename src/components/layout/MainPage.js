import React from 'react';
import {Layout} from 'antd';
import styles from './MainPage.module.less';
import {ConnectedContentArea} from './content/ContentArea';
import {FooterArea} from './footer/FooterArea';
import {ConnectedMobileSidebar} from './mobile/sidebar/MobileSidebar';
import {ConnectedMobileHeader} from './mobile/header/MobileHeader';
import {FullscreenSidebar} from './siderbar/FullscreenSidebar';

const {Content} = Layout;

export function MainPage() {
  return (
    <Layout className={styles.fullHeight}>
      <ConnectedMobileHeader />
      <ConnectedMobileSidebar />

      <Layout>
        <FullscreenSidebar/>

        <Content className={styles.content}>
          <ConnectedContentArea/>
        </Content>

      </Layout>

      <FooterArea isMobile={true} />
    </Layout>
  );
}