import {createSelector} from 'reselect';
import {getFormValues} from 'redux-form';
import {concertsWithDistanceSelector} from './distanceSelectors';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from '../../filters/Constants';
import {concertsSelector} from './basicData';

export const countCountriesSelector = (state) => state.data.countries.length;

export const countArtistsSelector = (state) => state.data.artists.length;

const createFilterSelector = (name) => createSelector(
  [getFormValues(name)],
  (formValues) => {
    return new Map(Object.entries(formValues || [])
      .filter(([name, checked]) => checked));
  }
);

export const selectedCountriesSelector = createFilterSelector(COUNTRY_FILTER_NAME);

export const selectedArtistsSelector = createFilterSelector(ARTIST_FILTER_NAME);

export const getFilteredConcerts = createSelector(
  [
    concertsWithDistanceSelector,
    countCountriesSelector,
    countArtistsSelector,
    selectedCountriesSelector,
    selectedArtistsSelector
  ],
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


// TODO: optimize for "all selected"
export const availableCountries = createSelector(
  [
    concertsSelector,
    countArtistsSelector,
    selectedArtistsSelector
  ],
  (concerts, artistsQty, selectedArtists) => {
    return concerts.reduce((sum, it) => {
      if (it.members.some(artist => selectedArtists.has(artist.id))) {
        sum[it.location.country] = true;
      }
      return sum;
    }, {});
  }
);

export const availableArtists = createSelector(
  [
    concertsSelector,
    countCountriesSelector,
    selectedCountriesSelector
  ],
  (concerts, countriesQty, selectedCountries) => {
    return concerts.reduce((sum, it) => {
      if (selectedCountries.has(it.location.country)) {
        it.members.forEach(({id}) => sum[id] = true);
      }
      return sum;
    }, {});
  }
);