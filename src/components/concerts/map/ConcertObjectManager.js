import React from 'react';
import * as PropTypes from 'prop-types';
import {
  ObjectManager,
  withYMaps
} from 'react-yandex-maps';
import CLUSTER_HINT_TEMPLATE from './ClusterHintTemplate';

const OBJECT_OPTIONS = {
  openBalloonOnClick: true,
  preset: 'islands#redNightClubIcon'
};

const CLUSTER_OPTIONS = {
  preset: 'islands#invertedRedClusterIcons',
  hasHint: true
};

const MODULES_LIST = [
  'objectManager.addon.objectsBalloon',
  'objectManager.addon.objectsHint',
  'objectManager.addon.clustersHint'
];

function ConcertObjectManager({ymaps, concerts}) {
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
    />
  );
}

ConcertObjectManager.propTypes = {
  concerts: PropTypes.array.isRequired,
  ymaps: PropTypes.object.isRequired
};

const ConcertYandexObjectManager = withYMaps(
  React.memo(ConcertObjectManager),
  true,
  ['templateLayoutFactory']);

ConcertYandexObjectManager.propTypes = {
  concerts: PropTypes.array.isRequired
};

export default React.memo(ConcertYandexObjectManager);