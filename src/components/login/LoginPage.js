import React from 'react';

import Navbar from '../Navbar';
import LoginForm from './LoginForm';
import Footer from '../Footer';

class LoginPage extends React.Component{
  state = {
    email: '',
    password: '',
    message: undefined,
    emailErr: undefined,
    passwordErr: undefined,
    disabled: false,
    resDisabled: false,
    resMessage: undefined,
    resEmailErr: undefined,
    resFail: undefined,
    success: this.props.location.state === undefined ? false : this.props.location.state.success
  }
  setToken(idToken) {
    localStorage.setItem('wcToken', idToken);  
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password } = this.state;
      this.setState({disabled: "disabled"});

      const login = response => {
        if (response.hasOwnProperty('message') && response.message === "Login successfull"){
          this.setState({ message: "Welcome to WeConnect" }, () => {
            this.setToken(response.access_token);
            localStorage.setItem('username', response.username);
            this.props.history.push({
              pathname: '/dashboard',
              state: {
                'welcome': this.state.message
              }
            });
          });
        } else {
          this.setState ({
            message: response.hasOwnProperty('message') && response['message'], 
            emailErr: response.hasOwnProperty('email-error') && response['email-error'],
            passwordErr: response.hasOwnProperty('password-error') && response['password-error'],
            disabled: false
            });
        }
      };

      const loginFail = () => {
        this.setState ({
          message: "Login attempt failed. Try Again",
          disabled: false
          });
      };

      await fetch('https://wc-app-api.herokuapp.com/api/v1/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
                }
            )
        })
        .then((resp) => resp.json()) 
        .then(login)
        .catch(loginFail);
  }
  handleReset = async (event) => {
    event.preventDefault();
    this.setState({resDisabled: "disabled"});
    const email = event.target.email.value;

    const reset = async (response) => {
      if (response.status === 201){
        this.setState({
          resDisabled: false,
          resEmailErr: undefined,
          resFail: undefined,
          resMessage: "Password reset successfull. Check your email for your new password"
        });
      } else {
        response = await response.json(); 
        this.setState ({
          resMessage: undefined,
          resFail: response.hasOwnProperty('message') && response['message'], 
          resEmailErr: response.hasOwnProperty('email-error') && response['email-error'],
          resDisabled: false
        });
      }
    };

    await fetch('https://wc-app-api.herokuapp.com/api/v1/reset-password', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
          {
              "email": email
          }
      )
  })
  .then(reset)
  .catch()
  }
  
  render(){
    const {message, emailErr, passwordErr, disabled, resDisabled} = this.state;
    return(
      <div>
        <Navbar wrapLogin="active" />
        <LoginForm
          success={this.state.success}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleReset={this.handleReset}
          message={message}
          emailErr={emailErr}
          passwordErr={passwordErr}
          disabled={disabled}
          resDisabled={resDisabled}
          state={this.state}
        />
        <Footer />
      </div>
    );
  }
}

export default LoginPage;