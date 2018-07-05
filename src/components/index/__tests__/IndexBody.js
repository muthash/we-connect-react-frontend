import React from 'react';
import { shallow, mount, render } from 'enzyme';
import IndexBody from '../IndexBody';
import IndexPage from '../IndexPage';


describe('Index page Component', () => {

    it('should render without throwing an error', () => {
      expect(shallow(<IndexBody />).find('section#home').exists()).toBe(true);
    });
    it('should render without throwing an error', () => {
      expect(shallow(<IndexPage />).find('div').exists()).toBe(true);
    });
})