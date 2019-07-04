import {createSelector} from 'reselect';
import {DATA_KEYS} from '../reducers/Constants';
import {createLengthSelector} from './lib';

const {CONCERTS, COUNTRIES, ARTISTS} = DATA_KEYS;

// Data Slices
const createDataSelector = (key) => (state) => state.data[key];

export const getConcerts = createDataSelector(CONCERTS);
export const getCountries = createDataSelector(COUNTRIES);
export const getArtists = createDataSelector(ARTISTS);

export const DataSelectors = {
  [CONCERTS]: getConcerts,
  [COUNTRIES]: getCountries,
  [ARTISTS]: getArtists
};

// Data IDs
const createDataIdSelector = (key) => createSelector(
  DataSelectors[key],

  (items) => items.reduce((map, it) => {
    map[it.id] = true;
    return map;
  }, {})
);

export const getCountryIds = createDataIdSelector(COUNTRIES);
export const getArtistIds = createDataIdSelector(ARTISTS);

export const DataIdSelectors = {
  [COUNTRIES]: getCountryIds,
  [ARTISTS]: getArtistIds
};

// Data Qty
export const countConcerts = createLengthSelector(getConcerts);
export const countCountries = createLengthSelector(getCountries);
export const countArtists = createLengthSelector(getArtists);

export const CountSelectors = {
  [CONCERTS]: countConcerts,
  [COUNTRIES]: countCountries,
  [ARTISTS]: countArtists
};