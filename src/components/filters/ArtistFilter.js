import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {createFilterForm} from './FilterForm';
import {ARTIST_FILTER_NAME} from './Constants';
import AllArtistsSwitch from './AllArtistsSwitch';

class ArtistFilter extends Component {

  static propTypes = {
    artists: PropTypes.array.isRequired
  };

  render() {
    const {artists} = this.props;
    const initialValues = {};
    const items = [];

    for (const it of artists) {
      initialValues[it.id] = true;
      items.push({
        ...it,
        available: Boolean(it)
      });
    }

    const FormElement = createFilterForm(ARTIST_FILTER_NAME);
    return <div>
      <AllArtistsSwitch/>
      <FormElement items={items} initialValues={initialValues} />
    </div>;
  }
}

const mapStateToProps = ({data}) => ({artists: data.artists});

export default connect(mapStateToProps)(ArtistFilter);