import React from 'react';
import * as PropTypes from 'prop-types';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps';
import {Spin} from 'antd';
import {GOOGLE_API_URL} from '../../../api/google';

const GoogleMapWrapper = withScriptjs(withGoogleMap((props) => {
    const {location, setLocation} = props;

    return <GoogleMap
      defaultZoom={location ? 6 : 3}
      defaultCenter={location || {lat: 54, lng: 16.5}}
      onClick={e => {
        setLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
      }}
    >
      {location && <Marker position={location}/>}
    </GoogleMap>;
  }
));

GoogleMapWrapper.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object
};

const MapLocationPicker = (props) => {
  return <GoogleMapWrapper
    googleMapURL={GOOGLE_API_URL}
    loadingElement={
      <div style={{height: '100%', textAlign: 'center'}}><Spin/></div>}
    containerElement={<div style={{height: `400px`}}/>}
    mapElement={<div style={{height: `100%`}}/>}
    {...props}
  />;
};

MapLocationPicker.propTypes = {
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default MapLocationPicker;