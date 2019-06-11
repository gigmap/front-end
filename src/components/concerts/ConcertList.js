import React from 'react';
import * as PropTypes from 'prop-types';
import {BackTop, Col, Empty, Row} from 'antd';
import {connect} from 'react-redux';
import {getFilteredConcerts} from './selectors/filterSelectors';
import ConcertCard from './ConcertCard';


function renderConcert(concert) {
  return <Col xs={24} sm={8} md={6} key={concert.id}>
    <ConcertCard concert={concert}/>
  </Col>;
}

function ConcertList({concerts}) {
  return (
    concerts.length === 0 ?
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
      <Row gutter={16}>
        <BackTop/>
        {concerts.map(renderConcert)}
      </Row>
  );
}

ConcertList.propTypes = {
  concerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  concerts: getFilteredConcerts(state)
});

export default connect(mapStateToProps)(ConcertList);