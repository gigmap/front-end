import React from 'react';
import * as PropTypes from 'prop-types';
import {
  ObjectManager,
  withYMaps
} from 'react-yandex-maps';

const MAX_HINT_QTY = 5;

const CLUSTER_HINT_TEMPLATE = `
          {% if object.features.length > ${MAX_HINT_QTY} %}
            Click to zoom in and see the details
          {% else %}
            <div style="padding: 5px">
            {% for geoObject in object.features %} 
              {% if geoObject.properties.many %}
                {% for title in geoObject.properties.titles %}
                  - {{ title }}<br/>
                {% endfor %}
              {% else %}
                - {{ geoObject.properties.hintContent }}<br/>
              {% endif %}
            {% endfor %}
            </div>
          {% endif %}
        `;

function ConcertObjectManager({ymaps, concerts}) {
  return (
    <ObjectManager
      options={{
        clusterize: true,
        gridSize: 128,
        clusterHintContentLayout:
          ymaps.templateLayoutFactory.createClass(CLUSTER_HINT_TEMPLATE)
      }}
      objects={{
        openBalloonOnClick: true,
        preset: 'islands#violetNightClubIcon'
      }}
      clusters={{
        preset: 'islands#invertedVioletClusterIcons',
        hasHint: true
      }}
      features={concerts}
      modules={[
        'objectManager.addon.objectsBalloon',
        'objectManager.addon.objectsHint',
        'objectManager.addon.clustersHint'
      ]}
    />
  );
}

const ConcertYandexObjectManager =
  withYMaps(ConcertObjectManager, true, ['templateLayoutFactory']);

ConcertYandexObjectManager.propTypes = {
  concerts: PropTypes.array.isRequired,
  ymaps: PropTypes.object.isRequired
};

export default ConcertYandexObjectManager;