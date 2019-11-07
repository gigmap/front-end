// @flow
import React from 'react';
import styles from './SupportMailLink.module.css';

const MAIL = process.env.REACT_APP_SUPPORT_EMAIL;

export const SupportMailLink = () => {
  return (
    <a className={styles.link} href={`mailto:${MAIL}`}>{MAIL}</a>
  );
};