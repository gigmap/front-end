import {
  ARTISTS_DATA_KEY,
  COUNTRIES_DATA_KEY
} from '../../store/reducers/Constants';

export const COUNTRY_FILTER_NAME = 'countryFilter';
export const ARTIST_FILTER_NAME = 'artistFilter';

export const DATA_KEYS = Object.freeze({
  [COUNTRY_FILTER_NAME]: COUNTRIES_DATA_KEY,
  [ARTIST_FILTER_NAME]: ARTISTS_DATA_KEY
});