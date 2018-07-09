import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
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
      expect( data.find('div').length).toEqual(1);
  });
  
  it('should respond to change event and change the state of the business Component', () => {
    const emailInput = mount(<MemoryRouter><BusinessPage history={history} match={match} /></MemoryRouter>);
    const instance = emailInput.find(BusinessPage).instance();
    emailInput.find('#comment').simulate('change', {target: {name: 'description', value: 'comment'}});
    expect(instance.state.description).toEqual('comment');
  });

});