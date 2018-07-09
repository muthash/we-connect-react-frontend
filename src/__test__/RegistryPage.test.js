import React from 'react';
import { shallow } from 'enzyme';
import RegistryPage from '../components/registry/RegistryPage';
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
  const response = {
    "businesses": [
        {
            "business_id": 1,
            "business_name": "Mandela",
            "category": "Advertising",
            "created_by": "stephen",
            "description": "Andela’s mission is to advance human potential",
            "location": "Nairobi"
        }
    ],
    "current": 3,
    "next_page": null,
    "pages": 3,
    "prev_page": 2
  };
  it('should render without error', () => {
      const data = shallow(<RegistryBody state={state} history={history} />);
      expect( data.find('section').length).toEqual(1);
  });
  it('should render pagination', () => {
    const data = shallow(<Paginate state={state} currentPage={2} pages={1} history={history} />);
    expect( data.find('section').length).toEqual(1);
});

});