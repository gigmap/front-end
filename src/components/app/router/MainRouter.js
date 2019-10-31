// @flow
import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ROUTES} from '../../../constants/Routes';
import LoadingOverlay from '../../common/loading-overlay/LoadingOverlay';

const MainPage = React.lazy(() => import('../../layout/main/MainPage'));
const AboutPage = React.lazy(() => import('../../pages/about/AboutPage'));
const ImportPage = React.lazy(() => import('../../pages/import/index/ImportPage'));
const ImportGooglePage = React.lazy(() => import('../../pages/import/google/ImportGooglePage'));
const NotFoundPage = React.lazy(() => import('../../pages/not-found/NotFoundPage'));

export const MainRouter = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingOverlay />}>
        <Switch>
          <Route exact path={ROUTES.home} component={MainPage} />
          <Route exact path={ROUTES.import} component={ImportPage} />
          <Route exact path={ROUTES.googleMusic} component={ImportGooglePage} />
          <Route exact path={ROUTES.about} component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};