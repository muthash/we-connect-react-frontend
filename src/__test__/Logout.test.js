import React from 'react';

import { shallow, mount, render } from 'enzyme';
import Logout from '../components/login/Logout';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
global.localStorage = new LocalStorageMock;

describe('Logout page Component', () => {

  const mockUrl = {
    push : jest.fn()
  };  
  it('should render div class', () => {
        const data = shallow(<Logout history={mockUrl} />);
        expect(data.find('.container').exists()).toBe(true);
    });
});