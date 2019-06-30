import React from 'react';
import * as PropTypes from 'prop-types';
import {BackTop, Icon, Table} from 'antd';
import {connect} from 'react-redux';
import {getSortedConcerts} from '../selectors/concertListSelector';

const {Column} = Table;

function renderActions(concert) {
  return (
    <span>
      <a href={concert.uri} rel="noopener noreferrer" target="_blank">
        <Icon type="export"/> Songkick
      </a>
    </span>
  );
}

function RawConcertTable({concerts}) {
  return (
    <>
      <BackTop/>

      <Table dataSource={concerts} rowKey="id" pagination={false} scroll={{ y: 500 }}>
        <Column title="Bands" dataIndex="memberNames"/>
        <Column title="Date" dataIndex="start"/>
        <Column title="Location" dataIndex="location.city"/>
        <Column title="Event" dataIndex="displayName"/>
        <Column title="Action" render={(text, record) => renderActions(record)}
        />
      </Table>
    </>
  );
}

const ConcertTable = React.memo(RawConcertTable);

ConcertTable.propTypes = {
  concerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  concerts: getSortedConcerts(state)
});

export default connect(mapStateToProps)(ConcertTable);