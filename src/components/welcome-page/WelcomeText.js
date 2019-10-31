import React from 'react';
import {Typography} from 'antd';

const {Title, Text, Paragraph} = Typography;
const MAIL = process.env.REACT_APP_SUPPORT_EMAIL;
const getLink = (text) => (<a href={'https://www.songkick.com'}
                        rel={'nofollow noopener'}
                        target={'_blank'}>{text}</a>);

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
          the {getLink('Songkick')} project.
          <br/>
          So you would need a {getLink('Songkick')} account with your favorite artists
          tracked there.
        </Paragraph>
        <Paragraph>
          <b>Already have one?</b><br/>
          Just enter your username <a href={'#username-form'}>below</a>!
        </Paragraph>
        <Paragraph>
          <b>Don't have one?</b>
          <ol>
            <li>Go to {getLink('songkick.com')}</li>
            <li>Create an account</li>
            <li>Use search to find your favorite artists and click "Track artist"</li>
            <li>Come back here and enter your username!</li>
          </ol>
        </Paragraph>
        <Paragraph>
          <b>Have any questions?</b><br/>
          Don't hesitate to contact us at <a href={`mailto:${MAIL}`}>{MAIL}</a> to ask them.
        </Paragraph>
      </Text>
    </>
  );
}