import React, {Suspense} from 'react';
import {Icon, Tabs} from 'antd';
import Loading from '../common/Loading';

const LazyMap = React.lazy(() => import('./map/ConcertMap'));
const LazyList = React.lazy(() => import('./list/ConcertList'));
const LazyTable = React.lazy(() => import('./table/ConcertTable'));

const {TabPane} = Tabs;

export default function ConcertTabs() {
  return (
    <Tabs defaultActiveKey="3">
      <TabPane tab={<span><Icon type="unordered-list"/> List</span>} key="1">
        <Suspense fallback={<Loading/>}>
          <LazyList/>
        </Suspense>
      </TabPane>

      <TabPane tab={<span><Icon type="environment"/> Map</span>} key="2">
        <Suspense fallback={<Loading/>}>
          <LazyMap/>
        </Suspense>
      </TabPane>

      <TabPane tab={<span><Icon type="table"/> Table</span>} key="3">
        <Suspense fallback={<Loading/>}>
          <LazyTable />
        </Suspense>
      </TabPane>
    </Tabs>
  );
}