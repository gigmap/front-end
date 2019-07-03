import {createSelector} from 'reselect';
import {getConcertsWithDistance} from './getConcertsWithDistance';
import {
  getSelectedArtists,
  getSelectedCountries
} from '../../filters/selectors/_filterSelectors';
import {countArtists, countCountries} from '../../../store/selectors/basic';

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