import React from 'react';
import {shallow} from 'enzyme';
import {ContentArea} from './ContentArea';

describe('App', function () {
  function setup(propsOverrides) {
    const props = {
      loading: false,
      authenticated: false,
      ...propsOverrides
    };

    const wrapper = shallow(<ContentArea {...props} />);
    return {wrapper};
  }

  describe('snapshots', function () {
    [
      {loading: false, authenticated: false, finished: false},
      {loading: false, authenticated: true, finished: true},
      {loading: true, authenticated: false, finished: false},
      {loading: true, authenticated: true, finished: false}
    ].forEach(props => {
      it(`should render without crashing with props ${JSON.stringify(props)}`, () => {
        const {wrapper} = setup(props);
        expect(wrapper).toMatchSnapshot();
      });
    })
  });

  // TODO: mount to test lazy components
});