import React from 'react';
import styles from './AppHeader.module.css';
import SkLogo from './powered-by-songkick-white.svg';

export default function AppHeader() {
  let actionsBlock = <div/>;

  return <div className={styles.header}>
    {actionsBlock}
    <a href='https://www.songkick.com/' rel='noopener noreferrer'
       target='_blank'>
      <img src={SkLogo} alt='Powered by Songkick.com' height='50px'/>
    </a>
  </div>;
}
