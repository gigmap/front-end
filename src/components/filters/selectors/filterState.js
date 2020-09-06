import {
  DATA_KEYS,
  EVENT_OPTIONS_FILTER_KEY
} from '../../../store/reducers/Constants';
const {ARTISTS, COUNTRIES} = DATA_KEYS;

// Filter state map
const createFilterStateSelector =
  (key) => (state) => state.filters.selected[key];

export const getArtistFilterState = createFilterStateSelector(ARTISTS);
export const getCountryFilterState = createFilterStateSelector(COUNTRIES);
export const getEventOptionsFilterState = createFilterStateSelector(EVENT_OPTIONS_FILTER_KEY);

export const FilterStateSelectors = {
  [ARTISTS]: getArtistFilterState,
  [COUNTRIES]: getCountryFilterState,
  [EVENT_OPTIONS_FILTER_KEY]: getEventOptionsFilterState
};

