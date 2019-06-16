import React from 'react';
import * as PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getFilteredConcerts
} from '../selectors/concertListSelector';
import {
  Map, ObjectManager,
  Placemark,
  YMaps, ZoomControl
} from 'react-yandex-maps';
import {makeYaPosition} from '../../header/location/yandex/helpers';
import {getUserLocation} from '../selectors/distanceSelectors';
import {API_KEY} from '../../../api/yandex';
import {hasLocation} from '../helpers/lib';


// todo: memoize ?
function concertToFeature(concert) {
  const hint = concert.members.map(it => it.displayName).join(', '); // todo: persist ?

  return {
    type: 'Feature',
    id: concert.id,
    geometry: {
      type: 'Point',
      coordinates: makeYaPosition(concert.location)
    },
    properties: {
      hintContent: hint,
      balloonContentHeader: `${concert.start} ${hint}`,
      balloonContentBody: concert.displayName,
      balloonContentFooter: concert.location.city
    }
  };
}

const mapConcertsToFeatures = (concerts) => {
  return concerts.filter(hasLocation).map(concertToFeature);
};

function ConcertMap({concerts, location}) {

  const mapState = location ?
    {center: [location.lat, location.lng], zoom: 6} :
    {center: [54, 16.5], zoom: 4};

  const features = mapConcertsToFeatures(concerts);

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

          {location && <Placemark geometry={makeYaPosition(location)}
                                  options={{
                                    preset: 'islands#redHomeCircleIcon'
                                  }}/>}

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
            features={features}
            modules={[
              'objectManager.addon.objectsBalloon',
              'objectManager.addon.objectsHint'
            ]}
          >
          </ObjectManager>

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
  concerts: getFilteredConcerts(state),
  location: getUserLocation(state)
});

export default connect(mapStateToProps)(ConcertMap);