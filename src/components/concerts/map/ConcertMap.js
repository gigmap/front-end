import React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  Map,
  ObjectManager,
  Placemark,
  YMaps,
  ZoomControl
} from 'react-yandex-maps';
import {makeYaPosition} from '../../header/location/yandex/helpers';
import {getUserLocation} from '../selectors/distanceSelectors';
import {API_KEY} from '../../../api/yandex';
import {getYaMapFeatures} from './selectors';

const renderHome = (location) => (
  <Placemark geometry={makeYaPosition(location)}
             options={{
               preset: 'islands#redHomeCircleIcon'
             }}/>
);

function ConcertMap({concerts, location}) {

  const mapState = location ?
    {center: [location.lat, location.lng], zoom: 6} :
    {center: [54, 16.5], zoom: 4};

  return (
    <div style={{height: 700}}>
      <YMaps
        query={{
          apikey: API_KEY,
          lang: 'en_US',
          load: 'Map,Placemark'
        }}>

        <Map
          width='100%'
          height={700}
          defaultState={mapState}
        >

          {location && renderHome(location)}

          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 128
            }}
            objects={{
              openBalloonOnClick: true,
              preset: 'islands#violetNightClubIcon'
            }}
            clusters={{
              preset: 'islands#invertedVioletClusterIcons'
            }}
            features={concerts}
            modules={[
              'objectManager.addon.objectsBalloon',
              'objectManager.addon.objectsHint'
            ]}
          />

          <ZoomControl/>
        </Map>
      </YMaps>
    </div>
  );
}

ConcertMap.propTypes = {
  concerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  concerts: getYaMapFeatures(state),
  location: getUserLocation(state)
});

export default connect(mapStateToProps)(ConcertMap);