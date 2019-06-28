import {createSelector} from 'reselect/lib/index';
import {getFormValues} from 'redux-form';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from '../Constants';
import {
  getConcerts,
  getArtists,
  getCountries
} from '../../concerts/selectors/basicData';

const createFilterSelector = (name) => createSelector(
  [getFormValues(name)],
  (formValues) => {
    return new Map(Object.entries(formValues || [])
      .filter(([name, checked]) => checked));
  }
);

export const countCountries = (state) => state.data.countries.length;

export const countArtists = (state) => state.data.artists.length;

export const getUnsetCountries = (state) => state.filters.unsetCountries;

export const getUnsetArtists = (state) => state.filters.unsetArtists;

export const getSelectedCountries = createFilterSelector(COUNTRY_FILTER_NAME);

export const getSelectedArtists = createFilterSelector(ARTIST_FILTER_NAME);

export const countSelectedCountries =
  createSelector(getSelectedCountries, (itemsMap) => itemsMap.size);

export const countSelectedArtists =
  createSelector(getSelectedArtists, (itemsMap) => itemsMap.size);

export const getAvailableCountries = createSelector(
  getConcerts, countArtists, getSelectedArtists,
  (concerts, artistsQty, selectedArtists) => {
    return concerts.reduce((sum, it) => {
      if (it.members.some(artist => selectedArtists.has(artist.id))) {
        sum[it.location.country] = true;
      }
      return sum;
    }, {});
  }
);

export const getAvailableArtists = createSelector(
  getConcerts, countCountries, getSelectedCountries,
  (concerts, countriesQty, selectedCountries) => {
    return concerts.reduce((sum, it) => {
      if (selectedCountries.has(it.location.country)) {
        it.members.forEach(({id}) => sum[id] = true);
      }
      return sum;
    }, {});
  }
);

const getInitialValues = (allItems, unsetItems) => {
  return allItems.reduce((sum, it) => {
    sum[it.id] = !unsetItems[it.id];
    return sum;
  }, {});
};

export const getInitialArtists = createSelector(
  getArtists, getUnsetArtists,
  getInitialValues
);

export const getInitialCountries = createSelector(
  getCountries, getUnsetCountries,
  getInitialValues
);