// @flow

import {createSelector} from 'reselect';
import {getFilteredConcerts} from '../../selectors/getFilteredConcerts';
import type {Concert} from '../../../../types';

export const countShownConcerts = (state) => state.map.shownGigIds.length;

export const getShownIds = (state) => state.map.shownGigIds;

export const getShownConcerts = createSelector(
  getShownIds,
  getFilteredConcerts,
  (ids: string[], concerts: Concert[]) => {
    const idsMap = ids.reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, {});

    return concerts.filter(it => idsMap[it.id]);
  }
);

