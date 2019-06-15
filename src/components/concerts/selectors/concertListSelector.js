import {createSelector} from 'reselect';
import {getConcertsWithDistance, getUserLocation} from './distanceSelectors';
import {
  countArtists,
  countCountries,
  getSelectedArtists,
  getSelectedCountries
} from '../../filters/selectors/filterSelectors';
import {SORTING} from '../sorting/Constants';

const sortingFunctions = new Map([
  [SORTING.date, (a, b) => a.start > b.start ? 1 : -1],
  [SORTING.distance, (a, b) => a.distance > b.distance ? 1 : -1]
]);

export const getSorting = state => state.ui.sorting;

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

export const getSortedConcerts = createSelector(
  getFilteredConcerts,
  getSorting,
  getUserLocation,
  (concerts, sorting, location) => {
    const sortFn = sortingFunctions.get(location ? sorting : SORTING.date);
    return concerts.sort(sortFn).slice();
  }
);