import {createSelector} from 'reselect';
import {concertsSelector} from './basicData';

const toRad = (n) => {
  return n * Math.PI / 180;
};

// Distance in kilometers between two points using the Haversine algo.
function haversine({lat: lat1, lng: lon1}, {lat: lat2, lng: lon2}) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLong = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return Math.round(d);
}

export const userLocationSelector = (state) => state.user.location;

export const concertsWithDistanceSelector = createSelector(
  [concertsSelector, userLocationSelector],
  (concerts, userLocation) => {
    if (!userLocation) {
      return concerts;
    }

    return concerts.map(it => {
      return {
        ...it,
        distance: haversine(it.location, userLocation)
      };
    })
      .sort((a, b) => a.distance - b.distance)
  }
);