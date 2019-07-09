import {ChosenFilterItemsSelectors} from '../selection';
import {DATA_KEYS} from '../../../../store/reducers/Constants';
import {createSelector} from 'reselect';
import {FilterAvailabilitySelectors} from '../availability';

const {ARTISTS, COUNTRIES} = DATA_KEYS;

const createTagListSelector = (key) => createSelector(
  ChosenFilterItemsSelectors[key],
  FilterAvailabilitySelectors[key],

  (items, availableItems) => items
    .map(it => ({...it, isAvailable: Boolean(availableItems[it.id])}))
    .sort((a, b) => {
      if (a.isAvailable && !b.isAvailable) {
        return -1;
      }

      if (!a.isAvailable && b.isAvailable) {
        return 1;
      }

      return a.displayName > b.displayName ? 1 : -1;
    })
);

export const TagListSelectors = {
  [ARTISTS]: createTagListSelector(ARTISTS),
  [COUNTRIES]: createTagListSelector(COUNTRIES)
};
