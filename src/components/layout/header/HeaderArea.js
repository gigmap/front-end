import React from 'react';
import classNames from 'classnames';
import Logo from './logo.png';
import styles from './HeaderArea.module.less';
import adaptive from '../../../adaptive.module.less';

type HeaderAreaProps = {
  className: string
}

const HeaderArea = (props: HeaderAreaProps) => {
  return (
    <div className={props.className}>
      <img className={classNames(styles.image, adaptive.fullscreenOnly)}
           src={Logo} alt={'Dig a Gig!'}/>
      <span className={styles.title}><span>Dig</span> a <span>Gig</span></span>
    </div>
  );
};

export default HeaderArea;