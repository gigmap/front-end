// @flow
import React from 'react';
import {Typography} from 'antd';

const {Paragraph, Text} = Typography;
const MAIL = process.env.REACT_APP_SUPPORT_EMAIL;

export const ImportGoogleManual = () => {
  return (
    <Typography>
      <Paragraph>
        We can parse data from your Google Music playlist, find artists from
        that playlist in Songkick and provide you with links to go and track
        them.<br />
        It's not perfect, seems a bit complicated, but it's how it is for
        now.<br />
        Please follow several step below. Feel free
        to <a href={`mailto:${MAIL}`}>contact us</a> for any help.
      </Paragraph>
      <Paragraph>
        <ol>
          <li>Open a Goolge Music playlist page, for example "Thumbs up"
            auto-playlist
          </li>
          <li>Scroll down a little bit, so there are only tracks on the screen,
            no playlist info.
          </li>
          <li>Click right mouse button anywhere on empty space, select "Inspect"
            or "Inspect Element" from the appeared menu.
          </li>
          <li>You should see Inspector panel with "Elements" tab active. Click
            "Console" tab.
          </li>
          <li>
            Copy the following code:<br />
            <Text code copyable>
              document.querySelectorAll('html, body').forEach(it
              => &#123; it.style.height = '999999px'; it.style.overflow =
              'visible'; })
            </Text>
            <br />
            Paste it to the console and press "Enter".
          </li>
          <li>
            Copy the following code:<br />
            <Text code copyable>
              Array.from(document.querySelectorAll('.song-table
              td[data-col=artist]')).map(it => it.outerHTML).join('')
            </Text>
            <br />
            Paste it to the console and press "Enter".
          </li>
          <li>
            You should see a string output. Copy that, paste into the input
            field below and press "Submit".
          </li>
        </ol>
      </Paragraph>
    </Typography>
  );
};