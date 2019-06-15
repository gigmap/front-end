import React from 'react';
import * as PropTypes from 'prop-types';

import {
  GeolocationControl,
  Map,
  Placemark,
  SearchControl,
  YMaps
} from 'react-yandex-maps';
import {makeLatLng} from './helpers';
import {API_KEY} from '../../../../api/yandex';

const YandexMapLocationPicker = ({location, setLocation}) => {

  const withGeolocation = (ref) => {
    ref && ref.events.add('locationchange', event =>
      setLocation(makeLatLng(event.get('position'))));
  };

  const mapState = location ?
    {center: [location.lat, location.lng], zoom: 6} :
    {center: [54, 16.5], zoom: 4};

  return (
    <div style={{height: 400}}>
      <YMaps
        query={{
          apikey: API_KEY,
          lang: 'en_US',
          load: 'Map,Placemark'
        }}>

        <Map
          width='100%'
          height={400}
          defaultState={mapState}
          state={mapState}
          onClick={(e) => setLocation(makeLatLng(e.get('coords')))}
          instanceRef={(ref) => {
            if (ref) {
              // todo: cursor list grows (!)
              ref.cursors.push('pointer');
            }
          }}
        >
          <GeolocationControl instanceRef={withGeolocation} options={{
            float: 'left',
            noPlacemark: true
          }}
          />

          <SearchControl options={{
            float: 'left',
            kind: 'locality',
            noPlacemark: true
          }} />

          {location && <Placemark geometry={[location.lat, location.lng]}/>}
        </Map>
      </YMaps>
    </div>
  );
};

YandexMapLocationPicker.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default YandexMapLocationPicker;