import React from 'react';
import * as ReactGA from 'react-ga';
import {MainPage} from '../layout/MainPage';
import {ErrorBoundary} from './error-boundary/ErrorBoundary';

export function App() {
  ReactGA.pageview('/');

  return (
    <ErrorBoundary>
      <MainPage/>
    </ErrorBoundary>
  );
}