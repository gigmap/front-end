// @flow

import * as React from 'react';
import {Descriptions, Table} from 'antd';
import adaptive from '../../../adaptive.module.less';
import type {Concert} from '../../../types';
import {MemoizedEventOptionIcons} from '../../common/icons/EventOptionIcons';

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

const renderMembers = (concert: Concert) => (
  <>
    {concert.memberNames}
    <MemoizedEventOptionIcons concert={concert} />
  </>
);

const columns = [
  {
    title: 'Who',
    dataIndex: 'memberNames',
    key: 'memberNames',
    width: 250,
    sorter: (a, b) => a.memberNames > b.memberNames ? 1 : -1,
    render: (text, concert) => renderMembers(concert)
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

const renderDescriptionItem = (concert: Concert) => {
  return (
    <div key={concert.id} style={{marginBottom: 15}}>
      <Descriptions size={'small'} bordered layout={'vertical'}>
        <Descriptions.Item label={renderMembers(concert)}>
          <div>{renderDate(concert.start)}, {concert.location.city}</div>
          <div>{renderLink(concert.displayName, concert)}</div>
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export const GigTable = (props: GigTableProps) => {
  const {concerts} = props;

  return (
    <>
      <div className={adaptive.mobileOnly}>
        {concerts.map(renderDescriptionItem)}
      </div>
      <Table
        className={adaptive.fullscreenOnly}
        rowKey={'id'} size={'small'} pagination={false}
        columns={columns} dataSource={concerts}
        scroll={{y: 600}}
      />
    </>
  );
};

export default React.memo(GigTable);