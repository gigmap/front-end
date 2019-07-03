import {createSelector} from 'reselect/lib/index';
import {ARTIST_FILTER_NAME, COUNTRY_FILTER_NAME} from '../Constants';
import {getArtists, getCountries} from '../../../store/selectors/basic';

export const createFilterStateSelector =
  (name) => (state) => state.filters.selected[name];

export const getSelectedArtists = createSelector(
  getArtists,
  createFilterStateSelector(ARTIST_FILTER_NAME),

  (artists, filterState) => artists.filter(({id}) => filterState[id])
);

export const getSelectedCountries = createSelector(
  getCountries,
  createFilterStateSelector(COUNTRY_FILTER_NAME),

  (countries, filterState) => countries.filter(({id}) => filterState[id])
);