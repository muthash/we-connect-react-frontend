import React from 'react';
import { shallow, mount, render } from 'enzyme';
import IndexBody from '../IndexBody';

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('Index page Component', () => {

    it('should render without throwing an error', () => {
      expect(shallow(<IndexBody />).find('section#home').exists()).toBe(true);
    });
})