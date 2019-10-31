import React from 'react';
import * as ReactGA from 'react-ga';
import {ErrorBoundary} from './error-boundary/ErrorBoundary';
import {MainRouter} from './router/MainRouter';

export function App() {
  ReactGA.pageview('/'); // TODO: url

  return (
    <ErrorBoundary>
      <MainRouter />
    </ErrorBoundary>
  );
}