// @flow
import React from 'react';
import {Breadcrumb, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../../constants/Routes';

type BreadcrumbsProps = {
  title: string
};

// TODO: improve breadcrumbs
export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const {title} = props;
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={ROUTES.home}>
          <Icon type="home" />
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        {title || 'This page'}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};