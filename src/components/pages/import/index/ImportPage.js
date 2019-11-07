// @flow
import React from 'react';
import {SecondaryPageLayout} from '../../../layout/secondary-page/SecondaryPageLayout';
import {Button, Typography} from 'antd';
import {Link} from 'react-router-dom';
import {ROUTES} from '../../../../constants/Routes';
import {SongkickLink} from '../../../common/links/songkick/SongkickLink';

const {Paragraph} = Typography;

export const ImportPage = () => {
  return (
    <SecondaryPageLayout title={'Import'}>
      <Typography>
        <Paragraph>
          You can import your <b>Spotify</b> and <b>Last.fm</b> artists
          from&nbsp;
          <SongkickLink path={'/tracker/artists'} />.
        </Paragraph>
        <Paragraph>
          We also have a way to kinda import from Google Music playlists,
          but it might seem a little bit complicated though.
        </Paragraph>
        <Paragraph>
          <Link to={ROUTES.googleMusic}>
            <Button>Try Google Music import</Button>
          </Link>
        </Paragraph>
      </Typography>
    </SecondaryPageLayout>
  );
};

export default ImportPage;