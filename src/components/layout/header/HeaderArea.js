import React from 'react';
import classNames from 'classnames';
import Logo from './logo.png';
import styles from './HeaderArea.module.less';
import adaptive from '../../../adaptive.module.less';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../constants/Routes';

type HeaderAreaProps = {
  className: string
}

const HeaderArea = (props: HeaderAreaProps) => {
  return (
    <div className={props.className}>
      <Link to={ROUTES.home}>
        <img className={classNames(styles.image, adaptive.fullscreenOnly)}
             src={Logo} alt={'Dig a Gig!'} />
      </Link>
      <Link to={ROUTES.home} className={styles.title}>
          <span>Dig</span> a <span>Gig</span>
      </Link>
    </div>
  );
};

export default HeaderArea;