import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';
import {COUNTRY_FILTER_NAME} from './Constants';

class CountryFilter extends Component {

  static propTypes = {
    countries: PropTypes.array.isRequired
  };

  render() {
    const {countries} = this.props;
    const initialValues = {};
    const items = [];

    for (const it of countries) {
      initialValues[it] = true;
      items.push({id: it, displayName: it});
    }

    const FormElement = createFilterForm(COUNTRY_FILTER_NAME);
    return <FormElement items={items} initialValues={initialValues}/>;
  }
}

const mapStateToProps = ({data}) => ({countries: data.countries});

export default connect(mapStateToProps)(CountryFilter);