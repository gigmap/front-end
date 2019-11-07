// @flow
import React from 'react';

type ExternalLinkProps = {
  text?: string,
  url: string
};

export const ExternalLink = (props: ExternalLinkProps) => {
  const {url, text} = props;
  return (
    <a href={url}
       rel={'nofollow noopener'}
       target={'_blank'}>
      {text || url}
    </a>
  );
};