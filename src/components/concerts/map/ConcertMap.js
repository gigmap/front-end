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
import {ConcertObjectManagerWithYmaps} from './ConcertObjectManager';
import {getUserLocation} from '../../../store/selectors/user';
import HomePlacemark from './HomePlacemark';
import type {GeoPoint, Concert} from '../../../types';
import {setShownGigIds} from '../../../store/actions/map';
import {default as ShownGigsCounter} from '../popup-list/ShownGigsCounter';
import {default as ShownGigsPopup} from '../popup-list/ShownGigsPopup';

const MAP_QUERY = {
  apikey: API_KEY,
  lang: 'en_US',
  load: 'Map,Placemark'
};

type ConcertMapProps = {
  concerts: Concert[],
  location: GeoPoint,
  setShownGigIds: Function
};

function ConcertMap(props: ConcertMapProps) {
  const {concerts, location, setShownGigIds} = props;

  const mapState = location ?
    {center: [location.lat, location.lng], zoom: 6} :
    {center: [54, 16.5], zoom: 4};

  return (
    <>
      <YMaps query={MAP_QUERY}>
        <Map width={'100%'} height={'100%'} defaultState={mapState}>
          {location && <HomePlacemark location={location}/>}
          <ConcertObjectManagerWithYmaps
            concerts={concerts} setShownGigIds={setShownGigIds}/>
          <ZoomControl/>
        </Map>
      </YMaps>
      <ShownGigsCounter />
      <ShownGigsPopup />
    </>
  );
}

const mapStateToProps = (state) => ({
  concerts: getYaMapFeatures(state),
  location: getUserLocation(state)
});

const mapDispatchToProps = {
  setShownGigIds
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ConcertMap));