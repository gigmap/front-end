// @flow

import {createSelector} from 'reselect';
import {
  countChosenArtists,
  countChosenCountries
} from '../../filters/selectors/selection';
import type {Concert} from '../../../types';
import {
  countArtists,
  countCountries,
  getConcerts
} from '../../../store/selectors/data';
import {
  getArtistFilterState,
  getCountryFilterState,
  getEventOptionsFilterState
} from '../../filters/selectors/filterState';
import type {EventOptionsFilter} from '../../../store/reducers/filters/selected';

const makeEventOptionsPredicate = (eventOptions: EventOptionsFilter) => (concert: Concert) => {
  if (concert.going && !eventOptions.going) {
    return false;
  }

  if (concert.interested && !eventOptions.interested) {
    return false;
  }

  if (!concert.going && !concert.interested && !eventOptions.noAttendance) {
    return false;
  }

  return true;
};

export const getFilteredConcerts = createSelector(
  getConcerts,
  countCountries,
  countArtists,
  getCountryFilterState,
  getArtistFilterState,
  getEventOptionsFilterState,
  countChosenCountries,
  countChosenArtists,

  (
    concerts: Concert[],
    countryQty: number,
    artistQty: number,
    countryFilter: { [string]: boolean },
    artistFilter: { [string]: boolean },
    eventOptionsFilter: EventOptionsFilter,
    selectedCountryQty: number,
    selectedArtistQty: number
  ) => {

    const allCountriesSelected = selectedCountryQty === countryQty;
    const allArtistsSelected = selectedArtistQty === artistQty;

    // TODO: count in all display options for performance?
    // if (allArtistsSelected && allCountriesSelected) {
    //   return concerts;
    // }

    const checkDisplayOptions = makeEventOptionsPredicate(eventOptionsFilter);

    const checkArtist = allArtistsSelected ?
      () => true :
      concert => concert.members.some(artist => artistFilter[artist.id]);

    const checkCountry = allCountriesSelected ?
      () => true :
      concert => countryFilter[concert.location.country];

    return concerts.filter(
      it => checkArtist(it) && checkCountry(it) && checkDisplayOptions(it));
  });