import React, {Component} from 'react';

import Navbar from '../Navbar';
import RegisterForm from './RegisterForm';
import Footer from '../Footer';

class RegisterPage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      message: undefined,
      emailErr: undefined,
      usernameErr: undefined,
      passwordErr: undefined,
      disabled: false
    } 
  }  
  
    handleChange = e => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
      event.preventDefault();
      const { username, email, password } = this.state;

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
      const registerFail = () => {
        this.setState ({
          message: "Login attempt failed. Try Again",
          disabled: false
          });
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
        .catch(registerFail);
    }
    render(){
        return(
          <div>
            <Navbar wrapRegister="active" />
            <RegisterForm 
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              state={this.state}
            />
            <Footer />
          </div>
        );
      }
}

export default RegisterPage;