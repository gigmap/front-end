import React from 'react';
import {Alert, Button, Typography} from 'antd';
import * as ReactGA from 'react-ga';
import style from './ErrorBoundary.module.less';
import {SupportMailLink} from '../../common/links/mail/SupportMailLink';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    ReactGA.exception({
      description: `${error.message}:\nStack:\n${info.componentStack}`,
      fatal: true
    });
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
                <p>
                  Or feel free to contact us at <SupportMailLink />.
                </p>
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