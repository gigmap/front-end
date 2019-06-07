import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';

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

    const TheForm = createFilterForm('artistFilter'); // TODO: create constant
    return <TheForm items={artists} initialValues={initialValues} />;
  }
}

const mapStateToProps = ({data}) => ({artists: data.artists});

export default connect(mapStateToProps)(ArtistFilter);