// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {COUNTRIES_DATA_KEY} from '../../../store/reducers/Constants';
import {connectFilter} from '../multi-select/connectFilter';

const CountryFilter = () => {
  const ConnectedFilter = connectFilter(COUNTRIES_DATA_KEY)(MultiSelectFilter);
  return (
    <ConnectedFilter
      wording={{singular: 'country', plural: 'countries'}}
      dataKey={COUNTRIES_DATA_KEY}
    />
  );
};

export default CountryFilter;