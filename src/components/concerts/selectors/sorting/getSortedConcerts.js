import {createSelector} from 'reselect';
import {getFilteredConcerts} from '../getFilteredConcerts';
import {getUserLocation} from '../../../../store/selectors/basic';
import {SORTING} from './Constants';

const getSorting = state => state.ui.sorting;

const sortingFunctions = new Map([
  [SORTING.date, (a, b) => a.start > b.start ? 1 : -1],
  [SORTING.distance, (a, b) => a.distance > b.distance ? 1 : -1]
]);

export const getSortedConcerts = createSelector(
  getFilteredConcerts,
  getSorting,
  getUserLocation,
  (concerts, sorting, location) => {
    const sortFn = sortingFunctions.get(location ? sorting : SORTING.date);
    return concerts.sort(sortFn).slice();
  }
);