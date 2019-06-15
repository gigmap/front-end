import {createSelector} from 'reselect';
import {getFormValues} from 'redux-form';
import {getConcertsWithDistance} from './distanceSelectors';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from '../../filters/Constants';
import {getConcerts} from './basicData';

const createFilterSelector = (name) => createSelector(
  [getFormValues(name)],
  (formValues) => {
    return new Map(Object.entries(formValues || [])
      .filter(([name, checked]) => checked));
  }
);

export const countCountries = (state) => state.data.countries.length;

export const countArtists = (state) => state.data.artists.length;

export const getSelectedCountries = createFilterSelector(COUNTRY_FILTER_NAME);

export const getSelectedArtists = createFilterSelector(ARTIST_FILTER_NAME);

export const countSelectedCountries =
  createSelector(getSelectedCountries, (itemsMap) => itemsMap.size);

export const countSelectedArtists =
  createSelector(getSelectedArtists, (itemsMap) => itemsMap.size);

export const getFilteredConcerts = createSelector(
  getConcertsWithDistance,
  countCountries,
  countArtists,
  getSelectedCountries,
  getSelectedArtists,
  /**
   * @param {Array} concerts
   * @param {number} countriesQty
   * @param {number} artistsQty
   * @param {Map} selectedCountries
   * @param {Map} selectedArtists
   * @return {T[]|Validator<NonNullable<any[]>> | any | Array}
   */
  (concerts, countriesQty, artistsQty, selectedCountries, selectedArtists) => {

    const allCountriesSelected = selectedCountries.size === countriesQty;
    const allArtistsSelected = selectedArtists.size === artistsQty;
    if (allArtistsSelected && allCountriesSelected) {
      return concerts;
    }

    const checkArtist = allArtistsSelected ?
      () => true :
      concert => concert.members.some(artist => selectedArtists.has(artist.id));

    const checkCountry = allCountriesSelected ?
      () => true :
      concert => selectedCountries.has(concert.location.country);

    return concerts.filter(it => checkArtist(it) && checkCountry(it));
  });

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