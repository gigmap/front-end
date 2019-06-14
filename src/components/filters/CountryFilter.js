import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';
import {COUNTRY_FILTER_NAME} from './Constants';
import AllCountriesSwitch from './AllCountriesSwitch';
import {
  availableCountries, countArtistsSelector,
  countCountriesSelector,
  getFilteredConcerts, selectedArtistsSelector, selectedCountriesSelector
} from '../concerts/selectors/filterSelectors';
import {concertsWithDistanceSelector} from '../concerts/selectors/distanceSelectors';

class CountryFilter extends Component {

  static propTypes = {
    countries: PropTypes.array.isRequired,
    // availableOnes: PropTypes.object.isRequired
  };

  render() {
    console.warn('ava', this.props.availableOnes);

    const {countries} = this.props;
    const initialValues = {};
    const items = [];

    for (const it of countries) {
      initialValues[it] = true;
      items.push({
        id: it, displayName: it,
        available: Boolean(it)
      });
    }

    const FormElement = createFilterForm(COUNTRY_FILTER_NAME);

    return <div>
      <AllCountriesSwitch/>
      <FormElement items={items} initialValues={initialValues}/>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  countries: state.data.countries,

  availableOnes: selectedArtistsSelector(state)
  // availableOnes: availableCountries(state)
});


export default connect(mapStateToProps)(CountryFilter);