// @flow

// TODO: review
import {createSelector} from 'reselect';
import {groupBy} from 'lodash';
import {makeYaPosition} from '../../../../api/yandex';
import {getFilteredConcerts} from '../../selectors/getFilteredConcerts';
import type {Concert} from '../../../../types';

const CONCERT_ICON = 'NightClub';
const FESTIVAL_ICON = 'Circus';
const REGULAR_COLOR = 'red';
const GOING_COLOR = 'green';
const INTERESTED_COLOR = 'blue';
const POSTPONED_COLOR = 'orange';

const getAdditionalText = (concert: Concert) => {
  const labels = [];

  if (concert.going) {
    labels.push('going');
  } else if (concert.interested) {
    labels.push('interested');
  }

  if (concert.postponed) {
    labels.push('postponed');
  }

  return labels.length > 0 ? ` (${labels.join(', ')})` : '';
};

const getColor = (concert: Concert) => {
  if (concert.going) {
    return GOING_COLOR;
  }

  if (concert.interested) {
    return INTERESTED_COLOR;
  }

  return concert.postponed ? POSTPONED_COLOR : REGULAR_COLOR;
};

const getPreset = (concert: Concert) => {
  const icon = concert.isFestival ? FESTIVAL_ICON : CONCERT_ICON;
  return `islands#${getColor(concert)}${icon}Icon`;
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
    const attendance = getAdditionalText(concert);
    return {
      ...result,
      id: String(concert.id), // Yandex.Map requires all ids to be the same type // TODO: during mapping?
      options: {
        preset: getPreset(concert)
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
    const attendance = getAdditionalText(it);
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