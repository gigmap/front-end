// @flow
import React from 'react';
import {SecondaryPageLayout} from '../../layout/secondary-page/SecondaryPageLayout';
import {Typography} from 'antd';

const {Paragraph} = Typography;
const MAIL = process.env.REACT_APP_SUPPORT_EMAIL;

export const AboutPage = () => {
  return (
    <SecondaryPageLayout title={'About'}>
      <Typography>
        <Paragraph>
          <i>This page is under construction, information will appear soon.</i>
        </Paragraph>
        <Paragraph>
          Meanwhile, if you have any questions, suggestions or thoughts about
          the site at all,
          please don't hesitate to contact us via email: <a
          href={`mailto:${MAIL}`}>{MAIL}</a>
        </Paragraph>
      </Typography>
    </SecondaryPageLayout>
  );
};

export default AboutPage;