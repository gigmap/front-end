import React from 'react';
import * as PropTypes from 'prop-types';
import {ObjectManager, withYMaps} from 'react-yandex-maps';
import CLUSTER_HINT_TEMPLATE from './templates/ClusterHintTemplate';
import CLUSTER_SIZE_TEMPLATE from './templates/ClusterNumberTemplate';
import type {Concert} from '../../../types';

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

type ConcertObjectManagerProps = {
  concerts: Concert[],
  ymaps: {},
  setShownGigIds: Function
}

class ConcertObjectManager extends React.PureComponent<ConcertObjectManagerProps> {

  constructor(...args) {
    super(...args);

    this.objectManager = null;

    const {ymaps} = this.props;
    if (!ymaps.template.filtersStorage.get('clusterSize')) {
      ymaps.template.filtersStorage.add('clusterSize', clusterCounterFilter);
    }

    this.clusterOptions = {
      preset: 'islands#invertedRedClusterIcons',
      clusterIconContentLayout:
        ymaps.templateLayoutFactory.createClass(CLUSTER_SIZE_TEMPLATE),
      hasHint: true
    };
  }

  updateShownIds = () => {
    const {ymaps, setShownGigIds} = this.props;
    const {bounds} = ymaps.util;

    const map = this.objectManager.getMap();

    const shownItems = this.objectManager.objects.getAll().filter(it => {
      const state = this.objectManager.getObjectState(it.id);
      const isShown = state.found && state.isShown;
      if (!isShown) {
        return false;
      }

      return bounds.containsPoint(map.getBounds(), it.geometry.coordinates);
    });

    setShownGigIds(shownItems
      .flatMap(it => it.properties.many ? it.properties.ids : it.id));
  };

  managerRefUpdated = (ref) => {
    if (!ref) {
      return;
    }

    this.objectManager = ref;
    this.updateShownIds();
    if (this.objectManager !== null) {
      return;
    }

    const map = ref.getMap();
    // map gets destroyed on component unmount, so no need to remove the event listener
    map.events.add('boundschange', this.updateShownIds);
  };

  render() {
    const {ymaps, concerts} = this.props;

    return (
      <ObjectManager
        options={{
          clusterize: true,
          gridSize: 128,
          clusterHintContentLayout:
            ymaps.templateLayoutFactory.createClass(CLUSTER_HINT_TEMPLATE)
        }}
        objects={OBJECT_OPTIONS}
        clusters={this.clusterOptions}
        features={concerts}
        modules={MODULES_LIST}
        instanceRef={this.managerRefUpdated}
      />
    );
  }
}

const ConcertObjectManagerWithYmaps = withYMaps(
  ConcertObjectManager,
  true,
  ['templateLayoutFactory', 'util.bounds', 'template.filtersStorage']);

ConcertObjectManagerWithYmaps.propTypes = {
  concerts: PropTypes.array.isRequired,
  setShownGigIds: PropTypes.func.isRequired
};

export {ConcertObjectManagerWithYmaps};