// @flow
import React from 'react';
import {SecondaryPageLayout} from '../../layout/secondary-page/SecondaryPageLayout';
import {Typography} from 'antd';
import {SupportMailLink} from '../../common/links/mail/SupportMailLink';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../constants/Routes';

const {Paragraph, Title} = Typography;

export const AboutPage = () => {
  return (
    <SecondaryPageLayout title={'About'}>
      <Typography>
        <Paragraph>
          The purpose of this web-site is providing the most convenient way for
          music fans to discover live concerts of your favorite artists.
          <br />
          If you love gigs, have a lot of bands you'd like to see and don't mind
          traveling, there's a huge amount of possibilities. And it could be
          really hard to keep track of all the events and venues.
          <br />
          Here on <Link to={ROUTES.home}>dig-a-gig.com</Link>, you can see them
          all on a map, use filters to
          narrow down the list and then make a decision where to go!
        </Paragraph>

        <Title level={3}>FAQ</Title>
        <Title level={4}>Why do I need a Songkick account?</Title>
        <Paragraph>
          Basically, because we use concert data, provided by Songkick.
        </Paragraph>

        <Title level={4}>How do you access my Songkick account?</Title>
        <Paragraph>
          Songkick provides an API - a way to access their data. A user name is
          enough for retrieving account data like tracked artists or venues.
          <br />
          It doesn't require authorization. We can't read any private or
          personal data and we can't make any changes to the account.
        </Paragraph>
        <Title level={4}>Why do I have 0/0 artists and countries?</Title>
        <Paragraph>
          We show only artists who have at least 1 concert during the selected
          time period.
          <br />
          0/0 means that none of your tracked artists has concerts on selected
          dates.
          <br />
          Try to select other dates or track more artists.
        </Paragraph>
        <Title level={3}>Help and support</Title>
        <Paragraph>
          If you have any questions, suggestions or thoughts about
          the site at all,
          please don't hesitate to contact us via email: <SupportMailLink />
        </Paragraph>
      </Typography>
    </SecondaryPageLayout>
  );
};

export default AboutPage;