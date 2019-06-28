import React from 'react';
import {Typography} from 'antd';

const {Title, Text, Paragraph} = Typography;
const songkickLink = <a href={'https://www.songkick.com'}
                        rel={'nofollow noopener'}
                        target={'_blank'}>Songkick</a>;

export default function WelcomeText() {
  return (
    <>
      <Title level={2}>What's going on?</Title>
      <Text>
        <Paragraph>
          GigMap is here to help you discover gigs and concerts of your favorite
          artists all over the world.
        </Paragraph>
        <Paragraph>
          To do so, we use data generously provided by
          awesome {songkickLink} project.
          <br/>
          So you would need a {songkickLink} account with your favorite artists
          tracked there.
        </Paragraph>
        <Paragraph>
          Have one? Just follow a couple of quick simple steps below!
        </Paragraph>
      </Text>
    </>
  );
}