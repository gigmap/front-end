import React from 'react';
import {ErrorBoundary} from './error-boundary/ErrorBoundary';
import {MainRouter} from './router/MainRouter';

export function App() {
  return (
    <ErrorBoundary>
      <MainRouter />
    </ErrorBoundary>
  );
}