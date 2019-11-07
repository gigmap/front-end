import React from 'react';
import {Typography} from 'antd';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../constants/Routes';
import {SupportMailLink} from '../common/links/mail/SupportMailLink';
import {SongkickLink} from '../common/links/songkick/SongkickLink';
import {ConnectedTryOutButton} from './try-out-button/TryOutButton';

const {Title, Text, Paragraph} = Typography;

export function WelcomeText() {
  return (
    <>
      <Title>Welcome to Dig a Gig!</Title>
      <Title level={2}>What's going on?</Title>
      <Text>
        <Paragraph>
          We are here to help you discover gigs and concerts of your favorite
          artists all over the world.
        </Paragraph>
        <Paragraph>
          To do so, we use data generously provided by
          the <SongkickLink/> project.
          <br/>
          If you'd like to know more about how it works, check out our&nbsp;
          <Link to={ROUTES.about}>About page</Link>.
          <br/>
          So you would need a <SongkickLink/> account with your favorite artists
          tracked there.
        </Paragraph>
        <Paragraph>
          <b>Already have one?</b><br/>
          Just enter your username <a href={'#username-form'}>below</a>!
        </Paragraph>
        <Paragraph>
          <b>Don't have one?</b><br/>
          <ConnectedTryOutButton/> We have a demo account with 200 top artists tracked.
          <br/>
          Or follow these simple steps to create your own account:
          <ol>
            <li>Go to <SongkickLink text={'songkick.com'}/></li>
            <li>Create an account</li>
            <li>Use search to find your favorite artists and click "Track artist"</li>
            <li>Come back here and enter your username!</li>
          </ol>
        </Paragraph>
        <Paragraph>
          <b>Have any questions?</b><br/>
          Don't hesitate to contact us at <SupportMailLink/> to ask them.
        </Paragraph>
      </Text>
    </>
  );
}