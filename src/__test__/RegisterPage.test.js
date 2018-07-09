import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { shallow, mount, render } from 'enzyme';
import RegisterPage from '../components/register/RegisterPage';
import RegisterForm from '../components/register/RegisterForm';

describe('Register page Component', () => {

    it('should render navbar', () => {
        const data = shallow(<RegisterPage />);
        expect( data.find('Navbar').length).toEqual(1);
    });

    it('should respond to change event and change the state of the Register Component', () => {
        const emailInput = mount(<MemoryRouter><RegisterPage /></MemoryRouter>);
        const instance = emailInput.find(RegisterPage).instance()
        emailInput.find('#useremail').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
        expect(instance.state.email).toEqual('blah@gmail.com');
    });

    it('should disable button on submit', () => {
        const emailInput = mount(<MemoryRouter><RegisterPage /></MemoryRouter>);
        const instance = emailInput.find(RegisterPage).instance();
        emailInput.find('#useremail').simulate('submit');
        expect(instance.state.disabled).toEqual('disabled');
    });

    describe('error message', () => {
        const state= {usernameErr: "There is an error here"};
        it('displays errror message', () => {
            const component = shallow(<RegisterForm state={state} />);
            const nameError = component.find('.invalid-feedback');
            expect(nameError.text()).toBe('There is an error here');
        });
    });

});