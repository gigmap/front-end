import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';

class CountryFilter extends Component {

  static propTypes = {
    countries: PropTypes.array.isRequired
  };

  render() {
    const {countries} = this.props;
    const initialValues = countries.reduce((all, it) => {
      all[it] = true;
      return all;
    }, {});

    const TheForm = createFilterForm('countryFilter'); // TODO: create constant
    return <TheForm items={countries} initialValues={initialValues}/>;
  }
}

const mapStateToProps = ({data}) => ({countries: data.countries});

export default connect(mapStateToProps)(CountryFilter);