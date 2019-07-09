import {createSelector} from 'reselect';
import {DataSelectors} from '../../../store/selectors/data';
import {DATA_KEYS} from '../../../store/reducers/Constants';
import {createLengthSelector} from '../../../store/selectors/lib';
import {FilterStateSelectors} from './filterState';

const {ARTISTS, COUNTRIES} = DATA_KEYS;

// Chosen filter items
const createChosenFilterItemsSelector = (key) => createSelector(
  DataSelectors[key],
  FilterStateSelectors[key],

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