import React from 'react';
import { shallow } from 'enzyme';
import BusinessPage from '../components/business/BusinessPage';

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

describe('Business page Component', () => {
    
  const match = {
    params: {id: 2}
  };
  const history = {
    push: jest.fn()
  };
  it('should render navbar', () => {
      const data = shallow(<BusinessPage history={history} match={match} />);
      expect( data.find('Navdash').length).toEqual(1);
  });

});