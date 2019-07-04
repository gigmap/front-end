// @flow

import React from 'react';
import {connect} from 'react-redux';
import {
  Map,
  YMaps,
  ZoomControl
} from 'react-yandex-maps';
import {API_KEY} from '../../../api/yandex';
import {getYaMapFeatures} from './selectors/geoObjects';
import ConcertObjectManager from './ConcertObjectManager';
import {getUserLocation} from '../../../store/selectors/user';
import HomePlacemark from './HomePlacemark';
import type {GeoPoint, Concert} from '../../../types';

const MAP_QUERY = {
  apikey: API_KEY,
  lang: 'en_US',
  load: 'Map,Placemark'
};

type Props = {
  concerts: Concert[],
  location: GeoPoint
};

function ConcertMap(props: Props) {
  const {concerts, location} = props;

  const mapState = location ?
    {center: [location.lat, location.lng], zoom: 6} :
    {center: [54, 16.5], zoom: 4};

  return (
    <YMaps query={MAP_QUERY}>
      <Map width={'100%'} height={'100%'} defaultState={mapState}>
        {location && <HomePlacemark location={location}/>}
        <ConcertObjectManager concerts={concerts}/>
        <ZoomControl/>
      </Map>
    </YMaps>
  );
}

const mapStateToProps = (state) => ({
  concerts: getYaMapFeatures(state),
  location: getUserLocation(state)
});

export default connect(mapStateToProps)(React.memo(ConcertMap));