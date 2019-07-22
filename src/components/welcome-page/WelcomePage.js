import React from 'react';
import {Typography} from 'antd';
import {WelcomeText} from './WelcomeText';
import {ConnectedUsernameForm} from './username-form/UsernameForm';
import styles from './WelcomePage.module.less';

const {Title} = Typography;

export function WelcomePage() {

  return (
    <div className={styles.wrapper}>
      <Typography>
        <WelcomeText/>

        <Title level={2}>Let's roll!</Title>

        <div className={styles.form}>
          <ConnectedUsernameForm />
        </div>
      </Typography>
    </div>
  );
}

export default WelcomePage; // default export required for lazy loading