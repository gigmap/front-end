import './FilterBlock.scss';

import React from 'react';
import {Col, Divider, Row} from 'antd';
import {createFilter} from './createFilter';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from './Constants';
import {
  artistsSelector,
  countriesSelector
} from '../concerts/selectors/basicData';
import {
  availableArtists,
  availableCountries,
  countArtistsSelector,
  countCountriesSelector,
  selectedArtistsSelector,
  selectedCountriesSelector
} from '../concerts/selectors/filterSelectors';

const ArtistFilter = createFilter(
  ARTIST_FILTER_NAME, artistsSelector, countArtistsSelector,
  availableArtists, selectedArtistsSelector
);

const CountryFilter = createFilter(
  COUNTRY_FILTER_NAME, countriesSelector, countCountriesSelector,
  availableCountries, selectedCountriesSelector
);

function FilterBlock() {
  return <div>
    <Row>
      <Col span={10}>
        <CountryFilter/>
      </Col>
      <Col span={2}>
        <Divider type='vertical'/>
      </Col>
      <Col span={10}>
        <ArtistFilter/>
      </Col>
    </Row>
  </div>;
}

export default FilterBlock;