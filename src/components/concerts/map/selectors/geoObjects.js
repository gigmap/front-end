// @flow

// TODO: review
import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {makeYaPosition} from '../../../../api/yandex';
import {getFilteredConcerts} from '../../selectors/getFilteredConcerts';
import type {Concert} from '../../../../types';

const REGULAR_PRESET = 'islands#redNightClubIcon';
const GOING_PRESET = 'islands#darkGreenNightClubIcon';
const INTERESTED_PRESET = 'islands#darkBlueNightClubIcon';

const getAttendanceText = (concert: Concert) => {
  if (concert.going) {
    return ' (going)';
  }
  return concert.interested ? ' (interested)' : '';
};

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
    const attendance = getAttendanceText(concert);
    return {
      ...result,
      id: String(concert.id), // Yandex.Map requires all ids to be the same type // TODO: during mapping?
      options: {
        preset: concert.going ? GOING_PRESET :
          (concert.interested ? INTERESTED_PRESET : REGULAR_PRESET)
      },
      properties: {
        qty,
        hintContent: `${concert.start}: ${concert.memberNames}${attendance}`,
        balloonContentHeader: `${concert.start} ${concert.memberNames}${attendance}`,
        balloonContentBody: `${concert.displayName}<br/>${renderUri(concert)}`,
        balloonContentFooter: concert.location.city
      }
    };
  }

  const ids = [];
  const details = [];
  const titles = [];
  for (const it of concerts.sort((a, b) => a.start > b.start ? 1 : -1)) {
    ids.push(it.id);
    const attendance = getAttendanceText(it);
    details.push(`<li>${it.start} ${it.memberNames}${attendance} ${renderUri(it)}</li>`);
    titles.push(`${it.start}: ${it.memberNames}${attendance}`);
  }

  return {
    ...result,
    id: ids.join('.'),
    options: {
      preset: 'islands#redIcon'
    },
    properties: {
      qty,
      iconContent: qty,
      hintContent: titles.map(it => `- ${it}`).join('<br/>'),
      balloonContentHeader: `${qty} concerts here`,
      balloonContentBody: `<ul>${details.join('')}</ul>`,
      balloonContentFooter: concerts[0].location.city,
      many: true,
      ids,
      titles
    }
  };
}

export const getYaMapFeatures = createSelector(
  getFilteredConcerts,

  (concerts: Concert[]) => {
    const concertsWithLocation = concerts.filter(it => it.isWithCoordinates);
    const locations: Concert[][] = Object.values(groupBy(
      concertsWithLocation, (it) => `${it.location.lat},${it.location.lng}`));

    return locations.map(concertToFeature);
  }
);