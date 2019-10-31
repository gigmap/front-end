// @flow
import React from 'react';
import {Breadcrumb, Icon, Layout, Typography} from 'antd';
import classes from 'classnames';
import {ConnectedMobileHeader} from '../mobile/header/MobileHeader';
import {ConnectedMobileSidebar} from '../mobile/sidebar/MobileSidebar';
import {GigMapFooter} from '../footer/GigMapFooter';
import styles from './SecondaryPage.module.less';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../constants/Routes';
import HeaderArea from '../header/HeaderArea';
import adaptive from '../../../adaptive.module.less';
import {Breadcrumbs} from '../navigation/breadcrumbs/Breadcrumbs';

const {Content, Header} = Layout;
const {Title} = Typography;


type StaticPageLayoutProps = {
  children: any,
  title: string
};

// TODO: improve breadcrumbs
export const SecondaryPageLayout = (props: StaticPageLayoutProps) => {
  const {title} = props;
  return (
    <Layout className={styles.mainLayout}>

      <ConnectedMobileHeader />
      <ConnectedMobileSidebar />

      <Layout className={styles.innerLayout}>
        <Header className={classes(adaptive.fullscreenOnly, styles.header)}>
          <HeaderArea className={styles.logoWrapper}/>
        </Header>
        <Content className={styles.content}>
          <Breadcrumbs title={title}/>
          {
            <Typography>
              <Title>{title}</Title>
            </Typography>
          }
          {props.children}
        </Content>

      </Layout>

      <GigMapFooter />
    </Layout>
  );
};