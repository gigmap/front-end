import React from 'react';
import {shallow} from 'enzyme';
import {App} from './App';
import {MainRouter} from './router/MainRouter';


describe('App', function () {
  function setup() {
    const wrapper = shallow(<App />);
    return {wrapper};
  }

  it('should render without crashing', () => {
    const {wrapper} = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should contain MainPage', () => {
    const {wrapper} = setup();

    expect(wrapper.find(MainRouter)).toHaveLength(1);
  });
});