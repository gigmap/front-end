import React from 'react';
import {Layout} from 'antd';
import styles from './MainPage.module.less';
import {ConnectedContentArea} from '../content/ContentArea';
import {GigMapFooter} from '../footer/GigMapFooter';
import {ConnectedMobileSidebar} from '../mobile/sidebar/MobileSidebar';
import {ConnectedMobileHeader} from '../mobile/header/MobileHeader';
import {FullscreenSidebar} from '../siderbar/FullscreenSidebar';

const {Content} = Layout;

export function MainPage() {
  return (
    <Layout className={styles.mainLayout}>
      <ConnectedMobileHeader />
      <ConnectedMobileSidebar />

      <Layout className={styles.innerLayout}>
        <FullscreenSidebar/>

        <Content className={styles.content}>
          <ConnectedContentArea/>
        </Content>

      </Layout>

      <GigMapFooter />
    </Layout>
  );
}

export default MainPage;