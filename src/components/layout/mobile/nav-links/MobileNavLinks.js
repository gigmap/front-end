// @flow
import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../../navigation/nav-links/static/StaticNavLinks.module.less';
import {NavLinks} from '../../navigation/nav-links/Constants';
import {connect} from 'react-redux';
import {toggleMobileSidebar} from '../../../../store/actions/ui';

type MobileNavLinksProps = {
  toggleMobileSidebar: Function
}

export const MobileNavLinks = (props: MobileNavLinksProps) => {
  const {toggleMobileSidebar} = props;

  return (
    <div className={styles.wrapper}>
      {
        Object.keys(NavLinks).map((key) => (
          <NavLink key={key} to={NavLinks[key]} onClick={toggleMobileSidebar}>
            {key}
          </NavLink>
        ))
      }
    </div>
  );
};

const mapDispatchToProps = {toggleMobileSidebar};

export const ConnectedMobileNavLinks =
  connect(null, mapDispatchToProps)(MobileNavLinks);