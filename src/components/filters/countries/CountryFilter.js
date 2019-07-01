// @flow

import React from 'react';
import {default as MultiSelectFilter} from '../multi-select/MultiSelectFilter';
import {COUNTRY_FILTER_NAME} from '../Constants';
import {getCountries} from '../../../store/selectors/basic';
import {getSelectedCountries} from '../selectors/selectors';
import {connect} from 'react-redux';

type CountryFilterProps = {
  allItems: [],
  selectedItems: []
}

const CountryFilter = (props: CountryFilterProps) => {
  const {allItems, selectedItems} = props;

  return (
    <MultiSelectFilter
      entityName={'country'}
      filterName={COUNTRY_FILTER_NAME}
      allItems={allItems}
      selectedItems={selectedItems}
    />
  );
};


const mapStateToProps = (state) => ({
  allItems: getCountries(state),
  selectedItems: getSelectedCountries(state)
});


export default connect(mapStateToProps)(CountryFilter);