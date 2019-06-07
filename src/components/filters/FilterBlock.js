import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as PropTypes from 'prop-types';

import {Col, Divider, Row} from 'antd';
import CountryFilter from './CountryFilter';
import ArtistFilter from './ArtistFilter';

class FilterBlock extends Component {

  static propTypes = {
    artists: PropTypes.array.isRequired
  };

  render() {
    return <div>
      <Row>
        <Col span={10}>
          <CountryFilter/>
        </Col>
        <Col span={2}>
          <Divider type='vertical'/>
        </Col>
        <Col span={10}>
          <ArtistFilter/>
        </Col>
      </Row>
    </div>;
  }
}

const mapStateToProps = ({data}) => ({artists: data.artists});

export default connect(mapStateToProps)(FilterBlock);