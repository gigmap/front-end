
// TODO: review searcsh
import {
  ARTISTS_DATA_KEY as ARTIST_FILTER_NAME,
  COUNTRIES_DATA_KEY as COUNTRY_FILTER_NAME
} from '../../../store/reducers/Constants';
import {createSelector} from 'reselect';
import {getArtists, getCountries} from '../../../store/selectors/data';

export const getArtistsSearch = (state) => state.filters.search[ARTIST_FILTER_NAME];

export const getCountriesSearch = (state) => state.filters.search[COUNTRY_FILTER_NAME];

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