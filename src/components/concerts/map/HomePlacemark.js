// @flow

import React from 'react';
import {makeYaPosition} from '../../../api/yandex';
import {Placemark} from 'react-yandex-maps';
import type {GeoPoint} from '../../../types';

type Props = {
  location: GeoPoint
};

function HomePlacemark(props: Props) {
  const {location} = props;

  return (
    <Placemark geometry={makeYaPosition(location)}
               options={{
                 preset: 'islands#redHomeCircleIcon'
               }}
    />
  );
}

export default React.memo(HomePlacemark);
