import './FilterBlock.scss';

import React from 'react';
import {Col, Divider, Row} from 'antd';
import {createFilterForm} from './createFilterForm';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from './Constants';
import {
  getArtists,
  getCountries
} from '../concerts/selectors/basicData';
import {
  getAvailableArtists,
  getAvailableCountries,
  countArtists,
  countCountries,
  countSelectedArtists,
  countSelectedCountries
} from '../concerts/selectors/filterSelectors';

const ArtistFilter = createFilterForm(
  ARTIST_FILTER_NAME, getArtists, countArtists,
  getAvailableArtists, countSelectedArtists
);

const CountryFilter = createFilterForm(
  COUNTRY_FILTER_NAME, getCountries, countCountries,
  getAvailableCountries, countSelectedCountries
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