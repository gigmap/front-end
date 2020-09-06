// @flow
import React from 'react';
import {ExternalLink} from '../external/ExternalLink';

type SongkickLinkProps = {
  path?: string,
  text?: string
};

const BASE_URL = 'https://www.songkick.com';

export const SongkickLink = (props: SongkickLinkProps) => {
  const {path, text = 'Songkick'} = props;
  const url = `${BASE_URL}${path || ''}`;
  return (
    <ExternalLink url={url} text={text} />
  );
};