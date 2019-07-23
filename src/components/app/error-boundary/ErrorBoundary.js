import React from 'react';
import style from './ErrorBoundary.module.less';
import {Alert, Button, Typography} from 'antd';

const MAIL = process.env.REACT_APP_SUPPORT_EMAIL;

const renderContacts = () => {
  if (!MAIL) {
    return null;
  }

  return (
    <p>
      Or feel free to <a href={`mailto:${MAIL}`}>contact us</a>
      at <a href={`mailto:${MAIL}`}>{MAIL}</a>.
    </p>
  );
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={style.wrapper}>
          <Alert
            showIcon={true}
            type={'error'}
            message={'Something went wrong :('}
            description={(
              <Typography>
                <p>Oops, the application crashed.</p>
                <p>Possible reasons:</p>
                <ul>
                  <li>A glitch</li>
                  <li>Songkick service is under maintenance</li>
                  <li>We screwed up</li>
                </ul>
                <p>
                  Please, try to reload the page or wait a couple of minutes.
                </p>
                {renderContacts()}
                <Button onClick={() => window.location.reload()}
                        type={'primary'}>
                  Reload Page
                </Button>
              </Typography>
            )}/>
        </div>
      );
    }

    return this.props.children;
  }
}