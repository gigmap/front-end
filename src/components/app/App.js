import React from 'react';
import {MainPage} from '../layout/MainPage';
import {ErrorBoundary} from './error-boundary/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <MainPage/>
    </ErrorBoundary>
  );
}