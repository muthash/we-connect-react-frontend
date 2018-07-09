import React from 'react';
import { shallow } from 'enzyme';
import RegistryBody from '../components/registry/RegistryBody';
import Paginate from '../components/registry/Paginate';

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

describe('Registry page Component', () => {
  const history = {
    push: jest.fn()
  };
  const state = {};
  it('should render without error', () => {
      const data = shallow(<RegistryBody state={state} history={history} />);
      expect( data.find('section').length).toEqual(1);
  });

  it('should render pagination', () => {
    const data = shallow(<Paginate state={state} currentPage={2} pages={1} history={history} />);
    expect( data.find('section').length).toEqual(1);
});

});