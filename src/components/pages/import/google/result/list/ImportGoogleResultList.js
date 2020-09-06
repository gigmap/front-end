// @flow
import React from 'react';
import type {ImportEntry} from '../../../../../../store/reducers/import/google/types';
import {Button, Table, Tag} from 'antd';

type ImportGoogleResultListProps = {
  items: ImportEntry[]
};

const COLUMNS = [
  {
    title: 'Google',
    dataIndex: 'googleArtist',
    key: 'googleArtist',
    render: (artist) => (
      <a target={'_blank'}
        rel="noopener noreferrer"
         href={`https://play.google.com/music/listen#/artist/${artist.id}`}>
        <Button icon={'eye'}>
          {artist.title}
        </Button>
      </a>
    )
  },
  {
    title: 'Songkick',
    dataIndex: 'songkickArtist',
    key: 'songkickArtist',
    render: (artist, record) => {
      if (!artist) {
        return (
          <Tag color={'red'}>not found</Tag>
        );
      }

      return (
        <Tag color={record.partialMatch ? 'orange' : 'green'}>
          {artist.displayName}
        </Tag>
      );
    }
  },
  {
    title: 'Actions',
    dataIndex: 'songkickArtist',
    key: 'actions',
    render: (artist, record) => {
      if (!artist) {
        return '-';
      }

      return (
        <a href={artist.uri} target={'_blank'} rel="noopener noreferrer">
          <Button type={'primary'}>
            {record.isTracked ? 'Go to Artist' : 'Go Track'}
          </Button>
        </a>
      );
    }
  }
];

export const ImportGoogleResultList = (props: ImportGoogleResultListProps) => {
  const {items} = props;
  return (
    <Table columns={COLUMNS} dataSource={items}
           scroll={{y: true}} rowKey={(record) => record.googleArtist.id}
           size={'middle'} bordered={false} pagination={false} />
  );
};

export const MemoImportGoogleResultList = React.memo(ImportGoogleResultList);