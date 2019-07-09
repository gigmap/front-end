import {DATA_KEYS} from '../../../store/reducers/Constants';
const {ARTISTS, COUNTRIES} = DATA_KEYS;

// Filter state map
const createFilterStateSelector =
  (key) => (state) => state.filters.selected[key];

export const getArtistFilterState = createFilterStateSelector(ARTISTS);
export const getCountryFilterState = createFilterStateSelector(COUNTRIES);

export const FilterStateSelectors = {
  [ARTISTS]: getArtistFilterState,
  [COUNTRIES]: getCountryFilterState
};

