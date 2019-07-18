import React, {useState} from 'react';
import * as PropTypes from 'prop-types';
import {ObjectManager, withYMaps} from 'react-yandex-maps';
import CLUSTER_HINT_TEMPLATE from './templates/ClusterHintTemplate';
import CLUSTER_SIZE_TEMPLATE from './templates/ClusterNumberTemplate';

const OBJECT_OPTIONS = {
  openBalloonOnClick: true,
  preset: 'islands#redNightClubIcon'
};

const MODULES_LIST = [
  'objectManager.addon.objectsBalloon',
  'objectManager.addon.objectsHint',
  'objectManager.addon.clustersHint'
];

const clusterCounterFilter = (data, items) => {
  return items.reduce((acc, it) => acc + it.properties.qty, 0);
};

// TODO: this whole thing smells - class component or useEffect ?

function ConcertObjectManager({ymaps, concerts, setShownGigIds}) {

  const [mapRef, setMapRef] = useState(null);
  const {bounds} = ymaps.util;

  const updateShownIds = (manager) => {
    const map = manager.getMap();

    const shownItems = manager.objects.getAll().filter(it => {
      const state = manager.getObjectState(it.id);
      const isShown = state.found && state.isShown;
      if (!isShown) {
        return false;
      }

      return bounds.containsPoint(map.getBounds(), it.geometry.coordinates);
    });

    setShownGigIds(shownItems
      .flatMap(it => it.properties.many ? it.properties.ids : it.id));
  };

  if (!ymaps.template.filtersStorage.get('clusterSize')) {
    ymaps.template.filtersStorage.add('clusterSize', clusterCounterFilter);
  }

  const CLUSTER_OPTIONS = {
    preset: 'islands#invertedRedClusterIcons',
    clusterIconContentLayout:
      ymaps.templateLayoutFactory.createClass(CLUSTER_SIZE_TEMPLATE),
    hasHint: true
  };

  return (
    <ObjectManager
      options={{
        clusterize: true,
        gridSize: 128,
        clusterHintContentLayout:
          ymaps.templateLayoutFactory.createClass(CLUSTER_HINT_TEMPLATE)
      }}
      objects={OBJECT_OPTIONS}
      clusters={CLUSTER_OPTIONS}
      features={concerts}
      modules={MODULES_LIST}
      instanceRef={(ref) => {
        if (!ref) {
          return;
        }

        updateShownIds(ref);

        // no need to add another event handler instance
        if (mapRef) {
          return;
        }

        const map = ref.getMap();
        setMapRef(map);
        map.events.add('boundschange', () => updateShownIds(ref));
      }}
    />
  );
}

ConcertObjectManager.propTypes = {
  concerts: PropTypes.array.isRequired,
  ymaps: PropTypes.object.isRequired,
  setShownGigIds: PropTypes.func.isRequired
};

const ConcertYandexObjectManager = withYMaps(
  React.memo(ConcertObjectManager),
  true,
  ['templateLayoutFactory', 'util.bounds', 'template.filtersStorage']);

ConcertYandexObjectManager.propTypes = {
  concerts: PropTypes.array.isRequired,
  setShownGigIds: PropTypes.func.isRequired
};

export default React.memo(ConcertYandexObjectManager);