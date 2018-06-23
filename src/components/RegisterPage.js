import React from 'react';

import Navbar from './Navbar';
import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component{
    state = {
        message: undefined,
        email_error: undefined,
        username_error: undefined,
        password_error: undefined,
        form_style: "form-control"
    }
    getReg = async (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
  
        const api_call = await fetch('https://wc-app-api.herokuapp.com/api/v1/register', {
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
        });
        const data = await api_call.json();
        console.log(data);
        this.setState({
            message: data.message,
            email_error: data['email-error'],
            username_error: data['username-error'],
            password_error: data['password-error'],
            form_style: "form-control is-invalid"
        });
    }
    render(){
        return(
          <div>
            <Navbar />
            <RegisterForm 
                getReg={this.getReg}
                message={this.state.message}
                email_error={this.state.email_error}
                username_error={this.state.username_error}
                password_error={this.state.password_error}
                form_style={this.state.form_style}
            />
          </div>
        );
      }
}

export default RegisterPage;