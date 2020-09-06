// @flow

import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Map, YMaps, ZoomControl} from 'react-yandex-maps';
import {API_KEY} from '../../../api/yandex';
import {getYaMapFeatures} from './selectors/geoObjects';
import {ConcertObjectManagerWithYmaps} from './ConcertObjectManager';
import type {Concert} from '../../../types';
import {setPosition, setShownGigIds} from '../../../store/reducers/map/actions';
import {default as ShownGigsCounter} from '../popup-list/ShownGigsCounter';
import {default as ShownGigsPopup} from '../popup-list/ShownGigsPopup';
import {getMapPosition} from '../../../store/reducers/map/selectors';
import {ConnectedLocateButton} from './locations/locate-button/LocateButton';

const MAP_QUERY = {
  apikey: API_KEY,
  lang: 'en_US',
  load: 'Map,Placemark'
};

type ConcertMapProps = {
  concerts: Concert[],
  setShownGigIds: Function,
  setPosition: Function,
  position: {
    center: number[],
    zoom: number
  }
};

const ConcertMap = (props: ConcertMapProps) => {
  const {concerts, position, setShownGigIds, setPosition} = props;
  const [hasListener, setHasListener] = useState(false);

  const mapRefUpdated = (ref) => {
    if (!ref || hasListener) {
      return;
    }

    setHasListener(true);
    // TODO: unsubscribe? maybe unmount handles that
    ref.events.add('boundschange', (event) => {
      setPosition(event.originalEvent.newCenter, event.originalEvent.newZoom);
    });
  };

  return (
    <>
      <YMaps query={MAP_QUERY}>
        <Map width={'100%'} height={'100%'} state={position}
             instanceRef={mapRefUpdated}
        >
          <ConcertObjectManagerWithYmaps
            concerts={concerts} setShownGigIds={setShownGigIds} />
          <ZoomControl />
        </Map>
      </YMaps>
      <ShownGigsCounter />
      <ShownGigsPopup />
      <ConnectedLocateButton />
    </>
  );
};

const mapStateToProps = (state) => ({
  concerts: getYaMapFeatures(state),
  position: getMapPosition(state)
});

const mapDispatchToProps = {
  setShownGigIds,
  setPosition
};


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ConcertMap));