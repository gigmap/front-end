import {createSelector} from 'reselect';
import {DataSelectors} from '../../../store/selectors/data';
import {DATA_KEYS} from '../../../store/reducers/Constants';
import {createLengthSelector} from '../../../store/selectors/lib';

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

// Chosen filter items
const createChosenFilterItemsSelector = (key) => createSelector(
  DataSelectors[key],
  createFilterStateSelector(key),

  (items, filterState) => items.filter(({id}) => filterState[id])
);

export const getChosenArtists = createChosenFilterItemsSelector(ARTISTS);
export const getChosenCountries = createChosenFilterItemsSelector(COUNTRIES);

export const ChosenFilterItemsSelectors = {
  [ARTISTS]: getChosenArtists,
  [COUNTRIES]: getChosenCountries
};

// Chosen items qty
export const countChosenCountries = createLengthSelector(getChosenCountries);
export const countChosenArtists = createLengthSelector(getChosenArtists);

export const CountChosenItemsSelectors = {
  [ARTISTS]: countChosenArtists,
  [COUNTRIES]: countChosenCountries
};