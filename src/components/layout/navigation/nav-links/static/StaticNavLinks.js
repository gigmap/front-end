// @flow
import React from 'react';
import {NavLink} from 'react-router-dom';
import classNames from 'classnames';
import styles from './StaticNavLinks.module.less';
import {NavLinks} from '../Constants';
import {Icon} from 'antd';
import {ExternalLink} from '../../../../common/links/external/ExternalLink';

const FACEBOOK_URL =
  process.env.REACT_APP_FACEBOOK_URL || 'https://www.facebook.com/dig.a.gig.map';

type NavLinksProps = {
  toggleMobileSidebar?: Function
}

export const StaticNavLinks = ({toggleMobileSidebar}: NavLinksProps) => {
  const wrapperClasses = toggleMobileSidebar ?
    classNames(styles.wrapper, styles.mobile) :
    styles.wrapper;

  return (
    <div className={wrapperClasses}>
      {
        Object.keys(NavLinks).map((key) => (
          <NavLink key={key} to={NavLinks[key]} onClick={toggleMobileSidebar}>
            {key}
          </NavLink>
        ))
      }
      <ExternalLink url={FACEBOOK_URL}>
        <Icon type={'facebook'} theme={'filled'} className={styles.facebookIcon} />
      </ExternalLink>
    </div>
  );
};