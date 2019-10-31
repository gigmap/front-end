// @flow 
import React from 'react';
import {Button, Result} from 'antd';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../constants/Routes';
import {SecondaryPageLayout} from '../../layout/secondary-page/SecondaryPageLayout';

export const NotFoundPage = () => {
  return (
    <SecondaryPageLayout title={'Oops'}>
      <Result
        status="404"
        title="Page not found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to={ROUTES.home}>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </SecondaryPageLayout>
  );
};

export default NotFoundPage;