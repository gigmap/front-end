import React from 'react';
import {Layout} from 'antd';
import styles from './MainPage.module.less';
import ContentArea from './content/ContentArea';
import FooterArea from './footer/FooterArea';
import HeaderArea from './header/HeaderArea';
import SideControls from './siderbar/SideControls';

const {Header, Footer, Sider, Content} = Layout;

function MainPage() {
  return (
    <Layout className={styles.fullHeight}>

      <Sider className={styles.sidebar} width={400}>
        <Layout className={styles.fullHeight}>

          <Header className={styles.header}>
            <HeaderArea/>
          </Header>

          <Content className={styles.controls}>
            <SideControls />
          </Content>

          <Footer className={styles.footer}>
            <FooterArea/>
          </Footer>
        </Layout>

      </Sider>

      <Content className={styles.content}>
        <ContentArea />
      </Content>
    </Layout>
  );
}

export default MainPage;