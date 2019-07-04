// import React from 'react';
// import {Col, Divider, Row} from 'antd';
// import {createFilterForm} from './createFilterForm';
// import {
//   getAvailableArtists,
//   getAvailableCountries,
//   countSelectedArtists,
//   countSelectedCountries,
//   getInitialArtists,
//   getInitialCountries, getSearchedArtists, getSearchedCountries
// } from '../../filters/selectors/_filterSelectors';
// import {
//   getArtists,
//   getCountries, countArtists, countCountries
// } from '../../../store/selectors/basic';
// import {
//   ARTISTS_DATA_KEY as ARTIST_FILTER_NAME,
//   COUNTRIES_DATA_KEY as COUNTRY_FILTER_NAME
// } from '../../../store/reducers/Constants';
//
// const ArtistFilter = createFilterForm(
//   ARTIST_FILTER_NAME, getArtists, countArtists,
//   getAvailableArtists, countSelectedArtists, getInitialArtists, getSearchedArtists
// );
//
// const CountryFilter = createFilterForm(
//   COUNTRY_FILTER_NAME, getCountries, countCountries,
//   getAvailableCountries, countSelectedCountries, getInitialCountries, getSearchedCountries
// );
//
// function FilterBlock() {
//   return <Row>
//     <Col span={10}>
//       <CountryFilter/>
//     </Col>
//     <Col span={2}>
//       <Divider type='vertical'/>
//     </Col>
//     <Col span={10}>
//       <ArtistFilter/>
//     </Col>
//   </Row>;
// }
//
// export default FilterBlock;