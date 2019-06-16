import React from 'react';
import {Icon, Tabs} from 'antd';
import ConcertList from './list/ConcertList';
import ConcertMap from './map/ConcertMap';

const {TabPane} = Tabs;

export default function ConcertTabs() {
  return (
    <Tabs defaultActiveKey="2">
      <TabPane tab={<span><Icon type="unordered-list"/> List</span>}
               key="1">
        <ConcertList/>
      </TabPane>

      <TabPane
        tab={<span><Icon type="environment"/> Map</span>}
        key="2">
        <ConcertMap/>
      </TabPane>
    </Tabs>
  );
}