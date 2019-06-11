import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';
import {ARTIST_FILTER_NAME} from './Constants';

class ArtistFilter extends Component {

  static propTypes = {
    artists: PropTypes.array.isRequired
  };

  render() {
    const {artists} = this.props;
    const initialValues = artists.reduce((all, it) => {
      all[it.id] = true;
      return all;
    }, {});

    const FormElement = createFilterForm(ARTIST_FILTER_NAME);
    return <FormElement items={artists} initialValues={initialValues} />;
  }
}

const mapStateToProps = ({data}) => ({artists: data.artists});

export default connect(mapStateToProps)(ArtistFilter);