import React from 'react';
import * as PropTypes from 'prop-types';
import {BackTop, Card, Col, Empty, Icon, Popover, Row} from 'antd';
import styles from './ConcertList.module.scss';
import {connect} from 'react-redux';
import {getFilteredConcerts} from './selectors/selecttFilteredCountries';

function ConcertCard({concert}) {
  const titleText = concert.members.map(it => it.displayName).join(', ');
  const title = <div>
    <Popover content={titleText}>
      <div className={styles.cutText}>{titleText}</div>
    </Popover>
  </div>;

  const actions = [
    <span>&nbsp;</span>,
    <a href={concert.uri} rel='noopener noreferrer' target='_blank'><Icon
      type="export"/> Songkick</a>
  ];

  return <Col xs={24} sm={8} md={6}>
    <Card size='small' title={title}
          actions={actions}
          bodyStyle={{height: 120}}
          style={{marginBottom: 20}}>
      <div className={styles.bodyLine}><Icon
        type="environment"/> {concert.location.city}</div>
      <div className={styles.bodyLine}><Icon type="calendar"/> {concert.start}
      </div>
      <Popover content={concert.displayName}>
        <div className={styles.cutText}>{concert.displayName}</div>
      </Popover>
    </Card>
  </Col>;
}

ConcertCard.propTypes = {
  concert: PropTypes.object.isRequired
};

function ConcertList({concerts}) {
  return (
    concerts.length === 0 ?
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
      <Row gutter={16}>
        <BackTop/>
        {concerts.map((it) => <ConcertCard key={it.id} concert={it}/>)}
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