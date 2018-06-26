import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import Navbar from '../Navbar';
import RegisterForm from './RegisterForm';
import Footer from '../Footer';

class RegisterPage extends Component{
    state = {
        message: undefined,
        emailErr: undefined,
        usernameErr: undefined,
        passwordErr: undefined,
        disabled: false
    }
    
    handleSubmit = async (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const username = event.target.username.value;
      const password = event.target.password.value;

      this.setState({disabled: "disabled"});

      const newStatus = response => {
        if (response.hasOwnProperty('message') && response.message === "Account created successfully"){
          this.setState({ message: response.message }, () => {
            this.props.history.push({
              pathname: '/login',
              state: {
                'success': this.state.message,
              }
            });
          });
        } else {
          this.setState ({
            message: response.hasOwnProperty('message') && response['message'], 
            emailErr: response.hasOwnProperty('email-error') && response['email-error'],
            usernameErr: response.hasOwnProperty('username-error') && response['username-error'],
            passwordErr: response.hasOwnProperty('password-error') && response['password-error'],
            disabled: false
            });
        }
      };
      await fetch('https://wc-app-api.herokuapp.com/api/v1/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "username": username,
                    "password": password
                }
            )
        })
        .then((resp) => resp.json())
        .then(newStatus)
        .catch(function (error) {
          console.log('Request failed due to', error);
        });
    }
    render(){
      const {message, emailErr, usernameErr, passwordErr, disabled} = this.state;
        return(
          <div>
            <Navbar wrapRegister="active" />
            <RegisterForm 
              handleSubmit={this.handleSubmit}
              message={message}
              emailErr={emailErr}
              usernameErr={usernameErr}
              passwordErr={passwordErr}
              disabled={disabled}
            />
            <Footer />
          </div>
        );
      }
}

export default RegisterPage;