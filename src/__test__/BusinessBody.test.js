import React from 'react';
import { shallow, mount, render } from 'enzyme';
import BusinessBody from '../components/business/BusinessBody';
import DashBody from '../components/dashboard/DashBody';


describe('Index page Component', () => {
  const state = {
    message: undefined,
    business: {},
    reviews: [],
    numberOfReviews: '',
    description:'',
    messageFail:'',
    messageAdd:'',
    disabled: false,
    descErr: ''
  }  
  
  it('should render without throwing an error', () => {
      expect(shallow(<BusinessBody
          business_id={state.business.business_id} 
          business_name={state.business.business_name}
          category={state.business.category}
          created_by={state.business.create_by}
          description={state.business.description}
          location={state.business.location}
          reviews={state.reviews}
          reviewsNo={state.numberOfReviews}
          messageFail={state.messageFail}
          state={state}
       />).find('div').exists()).toBe(true);
    });
  
    it('should render without throwing an error', () => {
      expect(shallow(<DashBody
          business_id={state.business.business_id} 
          business_name={state.business.business_name}
          category={state.business.category}
          created_by={state.business.create_by}
          description={state.business.description}
          location={state.business.location}
          reviews={state.reviews}
          reviewsNo={state.numberOfReviews}
          messageFail={state.messageFail}
          state={state}
       />).find('div').exists()).toBe(true);
    });
})