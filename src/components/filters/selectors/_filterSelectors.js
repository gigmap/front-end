// TODO: review & refactor

import {createSelector} from 'reselect';
import {
  getConcerts,
  getCountries,
  getArtists,
  countArtists,
  countCountries
} from '../../../store/selectors/data';
import {
  ARTISTS_DATA_KEY as ARTIST_FILTER_NAME,
  COUNTRIES_DATA_KEY as COUNTRY_FILTER_NAME
} from '../../../store/reducers/Constants';

export const getUnsetCountries = (state) => state.filters.unsetCountries;

export const getUnsetArtists = (state) => state.filters.unsetArtists;

export const getArtistsSearch = (state) => state.filters.search[ARTIST_FILTER_NAME];

export const getCountriesSearch = (state) => state.filters.search[COUNTRY_FILTER_NAME];

// export const getAvailableCountries = createSelector(
//   getConcerts, countArtists, getSelectedArtists, // TODO: not a map anymore
//   (concerts, artistsQty, selectedArtists) => {
//     return concerts.reduce((sum, it) => {
//       if (it.members.some(artist => selectedArtists.has(artist.id))) {
//         sum[it.location.country] = true;
//       }
//       return sum;
//     }, {});
//   }
// );
//
// export const getAvailableArtists = createSelector(
//   getConcerts, countCountries, getSelectedCountries,  // TODO: not a map anymore
//   (concerts, countriesQty, selectedCountries) => {
//     return concerts.reduce((sum, it) => {
//       if (selectedCountries.has(it.location.country)) {
//         it.members.forEach(({id}) => sum[id] = true);
//       }
//       return sum;
//     }, {});
//   }
// );

// TODO: for searcsh
const getSearchedItems = (items, searchValue) => {
  if (!searchValue) {
    return items;
  }

  return items.filter(it => it.displayName.toLowerCase().startsWith(searchValue));
};

export const getSearchedArtists = createSelector(
  getArtists, getArtistsSearch,
  getSearchedItems
);
export const getSearchedCountries = createSelector(
  getCountries, getCountriesSearch,
  getSearchedItems
);