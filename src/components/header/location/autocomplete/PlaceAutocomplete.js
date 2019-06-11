import React, {Component} from 'react';
import {connect} from 'react-redux';
import {toggleLocationDialog} from '../../../../actions/ui';
import {AutoComplete} from 'antd/lib/index';
import {pick} from 'lodash';

import GoogleLogo from './img/powered_by_google_on_white.png';

const {Option} = AutoComplete;

// TODO: for later development

class PlaceAutocomplete extends Component {

  state = {
    cities: []
  };

  autocompleteService = new window.google.maps.places.AutocompleteService();
  placeService = new window.google.maps.places.PlacesService(document.createElement('div'));

  find(input) {
    if (!input) {
      return this.setState({cities: []});
    }

    this.autocompleteService.getPlacePredictions({
      input,
      types: ['(cities)']
    }, (result) => {

      if (!result) {
        return console.warn('NO RESULT', result);
      }
      this.setState({cities: result.map(it => pick(it, 'description', 'place_id'))});
    });
  }

  selectPlace(id) {
    this.placeService.getDetails({
      placeId: id,
      fields: ['geometry']
    }, (details) => {
      console.warn('details', details);
      console.warn('coord',
        details.geometry.location.lat(),
        details.geometry.location.lng()
      );
    });
  }

  render() {
    const children = this.state.cities.map(
      it => <Option key={it.place_id}>{it.description}</Option>);

    return (
      <div>
        <AutoComplete
          style={{width: 200}}
          onSelect={(item) => this.selectPlace(item)}
          onSearch={(input) => this.find(input)}
          placeholder="Enter you city name"
        >
          {children}
        </AutoComplete>
        <div>
          <a href='https://google.com'>
            <img src={GoogleLogo} alt='Powered by Google'/></a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ui}) => ({isOpen: ui.locationDialogOpen});

const mapDispatchToProps = {toggle: toggleLocationDialog};

export default connect(mapStateToProps, mapDispatchToProps)((PlaceAutocomplete));