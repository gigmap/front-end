// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {ARTISTS_DATA_KEY} from '../../../store/reducers/Constants';
import {connectFilter} from '../multi-select/connectFilter';
import {default as CheckboxFilterDialog} from '../multi-select/checkbox-list/CheckboxFilterDialog';
import {connectFilterDialog} from '../multi-select/checkbox-list/connectFilterDialog';

const ArtistFilter = () => {
  const ConnectedFilter = connectFilter(ARTISTS_DATA_KEY)(MultiSelectFilter);
  const ConnectedDialog = connectFilterDialog(ARTISTS_DATA_KEY)(CheckboxFilterDialog);


  const wording = {singular: 'artist', plural: 'artists'};
  return (
    <>
      <ConnectedDialog
        dataKey={ARTISTS_DATA_KEY}
        wording={wording}
      />

      <ConnectedFilter
        wording={wording}
        dataKey={ARTISTS_DATA_KEY}
      />
    </>
  );
};

export default ArtistFilter;