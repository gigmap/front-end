import React from 'react';
import {Layout} from 'antd';
import styles from './Footer.module.less';
import SkLogo from './powered-by-songkick-white.svg';
import adaptive from '../../../adaptive.module.less';
import {StaticNavLinks} from '../navigation/nav-links/static/StaticNavLinks';

const {Footer} = Layout;

export const GigMapFooter = () => {
  return (
    <Footer className={styles.footer}>
      <div className={adaptive.fullscreenOnly}>
        <StaticNavLinks />
      </div>
      <a href='https://www.songkick.com/' rel='noopener noreferrer'
         target='_blank'>
        <img src={SkLogo} alt='Powered by Songkick.com' height='50px' />
      </a>

      <div>
        <span role="img" aria-label="Heavy metal">🤟</span>
        <span role="img" aria-label="Cool face">😎</span>
        <span role="img" aria-label="Rock'n'Roll">🎸</span>
        <span>v{process.env.REACT_APP_VERSION}</span>
      </div>
    </Footer>
  );
};