import React from 'react';
import classNames from 'classnames';
import Logo from './logo.png';
import styles from './HeaderArea.module.less';
import adaptive from '../../../adaptive.module.less';

const HeaderArea = () => {
  return (
    <div className={styles.wrapper}>
      <img className={classNames(styles.image, adaptive.fullscreenOnly)}
           src={Logo} alt={'GigMap'}/>
      <span className={styles.title}><span>Gig</span>Map</span>
    </div>
  );
};

export default HeaderArea;