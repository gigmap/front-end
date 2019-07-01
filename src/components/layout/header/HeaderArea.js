import React from 'react';
import Logo from './logo.png';
import styles from './HeaderArea.module.less';

const HeaderArea = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.image} src={Logo} alt={'GigMap'}/>
      <span className={styles.title}><span>Gig</span>Map</span>
    </div>
  );
};

export default HeaderArea;