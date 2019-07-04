// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {
  COUNTRIES_DATA_KEY
} from '../../../store/reducers/Constants';
import {connectFilter} from '../multi-select/connectFilter';
import {connectFilterDialog} from '../multi-select/checkbox-list/connectFilterDialog';
import {default as CheckboxFilterDialog} from '../multi-select/checkbox-list/CheckboxFilterDialog';

const CountryFilter = () => {
  const ConnectedFilter = connectFilter(COUNTRIES_DATA_KEY)(MultiSelectFilter);
  const ConnectedDialog = connectFilterDialog(COUNTRIES_DATA_KEY)(CheckboxFilterDialog);

  const wording = {singular: 'country', plural: 'countries'};
  return (
    <>
      <ConnectedDialog
        dataKey={COUNTRIES_DATA_KEY}
        wording={wording}
      />

      <ConnectedFilter
        wording={wording}
        dataKey={COUNTRIES_DATA_KEY}
      />
    </>
  );
};

export default CountryFilter;