import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';
import {Alert, Button, Divider, Icon, Spin, Typography} from 'antd';
import {load} from '../../actions/data';
import ConcertList from './ConcertList';
import FilterBlock from '../filters/FilterBlock';
import styles from './ConcertPage.module.scss';
import {toggleFilters} from '../../actions/ui';

const { Title } = Typography;

class ConcertPage extends Component {

  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      artistQty: PropTypes.number,
      location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        city: PropTypes.string
      })
    }).isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      finished: PropTypes.bool.isRequired,
      error: PropTypes.string
    }).isRequired,
    ui: PropTypes.shape({
      filtersOut: PropTypes.bool.isRequired
    }),

    load: PropTypes.func.isRequired,
    toggleFilters: PropTypes.func.isRequired,
  };

  renderLoading() {
    return <div style={{textAlign: 'center'}}>
      <Spin size="large" tip="Loading artists and concerts..."/>
    </div>;
  }

  renderError(error) {
    const {load, user} = this.props;

    const notice = error ?
      <Alert type='error' showIcon
             message={<div>An error happened during concert loading:<br/>{error}</div>}
      /> :
      <Alert type='warning' showIcon
             message='Somehow concerts are not loaded.'/>;

    const button =
      <Button type='primary' style={{marginTop: 20}}
              onClick={() => load({username: user.name})}>Try Again</Button>;

    return <div>
      {notice}
      {button}
    </div>;
  }

  renderFilters() {
    const {ui: {filtersOut}, toggleFilters} = this.props;
    const wrapperStyles = filtersOut ?
      styles.filterWrapper :
      [styles.filterWrapper, styles.collapsed].join(' ');

    return <div>
      <div style={{textAlign: 'center', marginBottom: 10}}>
        <Title level={4} style={{textTransform: 'uppercase'}}>Filters</Title>
      </div>
      <div className={wrapperStyles}>
        <FilterBlock/>
      </div>
      <div style={{textAlign: 'center'}}>
        <Button style={{width: '100%', textAlign: 'center'}}
                onClick={() => toggleFilters(!filtersOut)}>
          <Icon type={filtersOut ? 'up' : 'down'}/>
        </Button>
      </div>
    </div>;
  }

  renderData() {
    return <div>
      {this.renderFilters()}
      <Divider />
      <ConcertList />
    </div>;
  }

  render() {
    const {data: {loading, finished, error}} = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (!finished || error) {
      return this.renderError(error);
    }

    return this.renderData();
  }
}

const mapStateToProps = ({user, data, ui}) => ({user, data, ui});
const mapDispatchToProps = {load, toggleFilters};

export default connect(mapStateToProps, mapDispatchToProps)(ConcertPage);