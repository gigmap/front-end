// @flow

import * as React from 'react';
import type {Concert} from '../../../types';
import {Table} from 'antd';

type GigTableProps = {
  concerts: Concert[]
};

const renderDate = (date: string) => (
  <span style={{whiteSpace: 'nowrap'}}>{date}</span>
);

const renderLink = (event: string, record: Concert) => (
  <a href={record.uri} rel={'noopener noreferrer'} target={'_blank'}>
    {event}
  </a>
);

const columns = [
  {
    title: 'Who',
    dataIndex: 'memberNames',
    key: 'memberNames',
    width: 150,
    sorter: (a, b) => a.memberNames > b.memberNames ? 1 : -1
  },
  {
    title: 'When',
    dataIndex: 'start',
    key: 'start',
    defaultSortOrder: 'ascend',
    width: 100,
    sorter: (a, b) => a.start > b.start ? 1 : -1,
    render: renderDate
  },
  {
    title: 'Where',
    dataIndex: 'location.city',
    key: 'location',
    width: 200
  },
  {
    title: 'Event',
    dataIndex: 'displayName',
    key: 'eventName',
    render: renderLink
  }

];

export const GigTable = (props: GigTableProps) => {
  const {concerts} = props;

  return (
    <Table
      rowKey={'id'} size={'small'} pagination={false}
      columns={columns} dataSource={concerts}
      scroll={{y: 600}}
    />
  );
};

export default React.memo(GigTable);