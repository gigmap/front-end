// @flow

import {createSelector} from 'reselect';
import {
  countChosenArtists,
  countChosenCountries,
  getArtistFilterState,
  getCountryFilterState
} from '../../filters/selectors/filterState';
import type {Concert} from '../../../types';
import {
  countArtists,
  countCountries,
  getConcerts
} from '../../../store/selectors/data';

export const getFilteredConcerts = createSelector(
  getConcerts,
  countCountries,
  countArtists,
  getCountryFilterState,
  getArtistFilterState,
  countChosenCountries,
  countChosenArtists,

  (
    concerts: Concert[],
    countryQty: number,
    artistQty: number,
    countryFilter: { [string]: boolean },
    artistFilter: { [string]: boolean },
    selectedCountryQty: number,
    selectedArtistQty: number
  ) => {

    const allCountriesSelected = selectedCountryQty === countryQty;
    const allArtistsSelected = selectedArtistQty === artistQty;
    if (allArtistsSelected && allCountriesSelected) {
      return concerts;
    }

    const checkArtist = allArtistsSelected ?
      () => true :
      concert => concert.members.some(artist => artistFilter[artist.id]);

    const checkCountry = allCountriesSelected ?
      () => true :
      concert => countryFilter[concert.location.country];

    return concerts.filter(it => checkArtist(it) && checkCountry(it));
  });