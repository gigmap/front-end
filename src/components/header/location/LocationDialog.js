import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {toggleLocationDialog} from '../../../actions/ui';
import {Modal} from 'antd/lib/index';
import MapLocationPicker from './MapLocationPicker';
import {setLocation, unsetLocation} from '../../../actions/user';
import {Button} from 'antd';


class LocationDialog extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    setLocation: PropTypes.func.isRequired,
    unsetLocation: PropTypes.func.isRequired,
    location: PropTypes.object
  };

  state = {
    selectedLocation: this.props.location
  };

  selectLocation(location) {
    this.setState({selectedLocation: location});
  }

  close = () => this.props.toggle(false);

  confirm = () => {
    this.props.setLocation(this.state.selectedLocation);
    this.close();
  };

  unset = () => {
    this.selectLocation(null);
    this.props.unsetLocation();
    this.close();
  };

  render() {
    const {isOpen} = this.props;

    const footer = [
      <Button key='unset' type='danger' disabled={!this.props.location}
              onClick={this.unset}>Unset</Button>,
      <Button key='back' onClick={this.close}>Cancel</Button>,
      <Button key='submit' type='primary' onClick={this.confirm}
              disabled={!this.state.selectedLocation}>
        Confirm
      </Button>
    ];

    return <Modal
      title="Select your location"
      visible={isOpen}
      onOk={this.confirm}
      onCancel={this.close}
      footer={footer}
    >
      <MapLocationPicker location={this.state.selectedLocation}
                         setLocation={(location) => this.selectLocation(location)}/>
    </Modal>;
  }
}

const mapStateToProps = ({ui, user: {location}}) =>
  ({isOpen: ui.locationDialogOpen, location});

const mapDispatchToProps = {toggle: toggleLocationDialog, setLocation, unsetLocation};

export default connect(mapStateToProps, mapDispatchToProps)((LocationDialog));