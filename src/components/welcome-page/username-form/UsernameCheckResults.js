// @flow

import React from 'react';
import {Alert} from 'antd';
import {SongkickLink} from '../../common/links/songkick/SongkickLink';

function renderContent(artistQty) {
  if (artistQty === 0) {
    const message = <span>
          You have no artists tracked on&nbsp;
          <SongkickLink path={'/tracker/artists'} />.
          Track some and try again!
    </span>;

    return (
      <Alert message={message} type="warning" showIcon />
    );
  }

  const word = artistQty === 1 ? 'artist' : 'artists';
  const tracked = `You have ${artistQty} ${word} tracked.`;
  const conclusion = artistQty < 30 ?
    'It shouldn\'t be long!' :
    'Loading their data can take a while, please, be patient.';

  return (
    <Alert message={`${tracked} ${conclusion}`} type="info" showIcon />
  );
}

type Props = {
  artistQty: number;
}

export function UsernameCheckResults({artistQty}: Props) {
  return (
    <div style={{marginTop: 20}}>
      {renderContent(artistQty)}
    </div>
  );
}