import {createSelector} from 'reselect';
import {DATA_KEYS} from '../../../../store/reducers/Constants';
import {FilterAvailabilitySelectors} from '../availability';
import {DataSelectors} from '../../../../store/selectors/data';
import {FilterStateSelectors} from '../filterState';

const {ARTISTS, COUNTRIES} = DATA_KEYS;

const createFilterOptionSelector = (key) => createSelector(
  DataSelectors[key],
  FilterStateSelectors[key],
  FilterAvailabilitySelectors[key],

  (items, filterState, availableItems) => items
    .map(it => ({
      ...it,
      isSelected: Boolean(filterState[it.id]),
      isAvailable: Boolean(availableItems[it.id])
    }))
);

export const FilterOptionSelectors = {
  [ARTISTS]: createFilterOptionSelector(ARTISTS),
  [COUNTRIES]: createFilterOptionSelector(COUNTRIES)
};
