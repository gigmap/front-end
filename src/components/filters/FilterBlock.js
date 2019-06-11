import React, {Component} from 'react';

import {Col, Divider, Row} from 'antd';
import CountryFilter from './CountryFilter';
import ArtistFilter from './ArtistFilter';

class FilterBlock extends Component {
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

export default FilterBlock;