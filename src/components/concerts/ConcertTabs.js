import React, {Suspense} from 'react';
import {Icon, Tabs} from 'antd';
import Loading from '../common/Loading';

const LazyMap = React.lazy(() => import('./map/ConcertMap'));
const LazyList = React.lazy(() => import('./list/ConcertList'));

const {TabPane} = Tabs;

export default function ConcertTabs() {
  return (
    <Tabs defaultActiveKey="2">
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
    </Tabs>
  );
}