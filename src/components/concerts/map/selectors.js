// @flow

import {createSelector} from 'reselect';
import {getFilteredConcerts} from '../selectors/concertListSelector';
import {hasLocation} from '../helpers/lib';
import {makeYaPosition} from '../../header/location/yandex/helpers';
import {groupBy} from 'lodash';

const renderUri = (concert: Concert) =>
  `<a href="${concert.uri}" rel="noreferrer noopener" target="_blank">Go to Songkick</a>`;

function concertToFeature(concerts: Concert[]) {
  const result = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: makeYaPosition(concerts[0].location)
    }
  };

  const qty = concerts.length;
  // todo: memoize ?
  if (qty === 1) {
    const [concert] = concerts;
    return {
      ...result,
      id: String(concert.id), // Yandex.Map requires all ids to be the same type
      properties: {
        hintContent: concert.memberNames,
        balloonContentHeader: `${concert.start} ${concert.memberNames}`,
        balloonContentBody: `${concert.displayName}<br/>${renderUri(concert)}`,
        balloonContentFooter: concert.location.city
      }
    };
  }

  let ids = [];
  let details = [];
  for (const it of concerts.sort((a, b) => a.start > b.start ? 1 : -1)) {
    ids.push(it.id);
    details.push(`<li>${it.start} ${it.memberNames} ${renderUri(it)}</li>`);
  }

  return {
    ...result,
    id: ids.join('.'),
    options: {
      preset: 'islands#violetIcon'
    },
    properties: {
      iconContent: qty,
      hintContent: `${qty} concerts here`,
      balloonContentHeader: `${qty} concerts here`,
      balloonContentBody: `<ul>${details.join('')}</ul>`,
      balloonContentFooter: concerts[0].location.city
    }
  };
}

export const getYaMapFeatures = createSelector(
  getFilteredConcerts,
  (concerts: Concert[]) => {
    const concertsWithLocation = concerts.filter(hasLocation);
    const locations: Concert[][] = Object.values(groupBy(
      concertsWithLocation, (it) => `${it.location.lat},${it.location.lng}`));

    return locations.map(concertToFeature);
  }
);