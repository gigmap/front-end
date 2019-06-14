import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {ARTIST_FILTER_NAME} from './Constants';
import {Checkbox} from 'antd';
import {
  countArtistsSelector,
  selectedArtistsSelector
} from '../concerts/selectors/filterSelectors';

import {change} from 'redux-form';

function AllArtistsSwitch({allQty, selectedQty, artists, change}) {
  const allSelected = allQty === selectedQty;

  function handleClick() {
    const value = !allSelected;
    artists.forEach(it => change(ARTIST_FILTER_NAME, it.id, value));
  }

  return <div>
    <Checkbox checked={allSelected} onClick={handleClick}
              indeterminate={!allSelected && selectedQty > 0}>
      <b>All artists</b>
    </Checkbox>
  </div>;
}

AllArtistsSwitch.propTypes = {
  artists: PropTypes.array.isRequired,
  allQty: PropTypes.number.isRequired,
  selectedQty: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  artists: state.data.artists,
  allQty: countArtistsSelector(state),
  selectedQty: selectedArtistsSelector(state).size
});

const mapDispatchToProps = {change};

export default connect(mapStateToProps, mapDispatchToProps)(AllArtistsSwitch);