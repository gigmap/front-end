// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {ARTISTS_DATA_KEY} from '../../../store/reducers/Constants';
import {connectFilter} from '../multi-select/connectFilter';

const ArtistFilter = () => {
  const ConnectedFilter = connectFilter(ARTISTS_DATA_KEY)(MultiSelectFilter);
  return (
    <ConnectedFilter
      wording={{singular: 'artist', plural: 'artists'}}
      dataKey={ARTISTS_DATA_KEY}
    />
  );
};

export default ArtistFilter;