import React from 'react';
import {Layout} from 'antd';
import classNames from 'classnames';
import styles from './Footer.module.less';
import SkLogo from './powered-by-songkick-white.svg';
import adaptive from '../../../adaptive.module.less';

const {Footer} = Layout;

type FooterAreaProps = {
  isMobile: boolean
}

export const FooterArea = (props: FooterAreaProps) => {

  const classes = classNames(
    styles.footer, props.isMobile ? adaptive.mobileOnly : adaptive.fullscreenOnly);

  return (
    <Footer className={classes}>
      <a href='https://www.songkick.com/' rel='noopener noreferrer'
         target='_blank'>
        <img src={SkLogo} alt='Powered by Songkick.com' height='50px'/>
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