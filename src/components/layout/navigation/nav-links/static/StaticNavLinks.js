// @flow
import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './StaticNavLinks.module.less';
import {NavLinks} from '../Constants';

export const StaticNavLinks = () => {
  return (
    <div className={styles.wrapper}>
      {
        Object.keys(NavLinks).map((key) => (
          <NavLink key={key} to={NavLinks[key]}>
            {key}
          </NavLink>
        ))
      }
    </div>
  );
};