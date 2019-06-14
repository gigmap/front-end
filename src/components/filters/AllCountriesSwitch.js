import React from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {COUNTRY_FILTER_NAME} from './Constants';
import {Checkbox} from 'antd';
import {
  countCountriesSelector,
  selectedCountriesSelector
} from '../concerts/selectors/filterSelectors';

import {change} from 'redux-form';

function AllCountriesSwitch({allQty, selectedQty, countries, change}) {
  const allSelected = allQty === selectedQty;

  function handleClick() {
    const value = !allSelected;
    countries.forEach(it => change(COUNTRY_FILTER_NAME, it, value));
  }

  return <div>
    <Checkbox checked={allSelected} onClick={handleClick}
              indeterminate={!allSelected && selectedQty > 0}>
      <b>All countries</b>
    </Checkbox>
  </div>;
}

AllCountriesSwitch.propTypes = {
  countries: PropTypes.array.isRequired,
  allQty: PropTypes.number.isRequired,
  selectedQty: PropTypes.number.isRequired,
  change: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  countries: state.data.countries,
  allQty: countCountriesSelector(state),
  selectedQty: selectedCountriesSelector(state).size
});

const mapDispatchToProps = {change};

export default connect(mapStateToProps, mapDispatchToProps)(AllCountriesSwitch);