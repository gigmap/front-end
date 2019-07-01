// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {ARTIST_FILTER_NAME} from '../Constants';
import {getArtists} from '../../../store/selectors/basic';
import {getSelectedArtists} from '../selectors/selectors';
import {connect} from 'react-redux';

type ArtistFilterProps = {
  allItems: [],
  selectedItems: []
}

const ArtistFilter = (props: ArtistFilterProps) => {
  const {allItems, selectedItems} = props;

  return (
    <MultiSelectFilter
      entityName={'artist'}
      filterName={ARTIST_FILTER_NAME}
      allItems={allItems}
      selectedItems={selectedItems}
    />
  );
};


const mapStateToProps = (state) => ({
  allItems: getArtists(state),
  selectedItems: getSelectedArtists(state)
});


export default connect(mapStateToProps)(ArtistFilter);