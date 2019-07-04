import {createSelector} from 'reselect';
import {
  getConcerts,
  countArtists,
  countCountries
} from '../../../store/selectors/data';
import {getArtistFilterState, getCountryFilterState} from './selection';
import type {Concert} from '../../../types';
import {
  ARTISTS_DATA_KEY,
  COUNTRIES_DATA_KEY
} from '../../../store/reducers/Constants';

export const getCountryAvailability = createSelector(
  getConcerts, countArtists, getArtistFilterState,

  (concerts: Concert[], artistsQty, selectedArtists) => {
    return concerts.reduce((sum, it) => {
      if (it.members.some(artist => selectedArtists[artist.id])) {
        sum[it.location.country] = true;
      }
      return sum;
    }, {});
  }
);

export const getArtistAvailability = createSelector(
  getConcerts, countCountries, getCountryFilterState,

  (concerts: Concert[], countriesQty, selectedCountries) => {
    return concerts.reduce((sum, it) => {
      if (selectedCountries[it.location.country]) {
        it.members.forEach(({id}) => sum[id] = true);
      }
      return sum;
    }, {});
  }
);

export const FilterAvailabilitySelectors = {
  [ARTISTS_DATA_KEY]: getArtistAvailability,
  [COUNTRIES_DATA_KEY]: getCountryAvailability
};