import {Component} from 'react';
import {loggedIn} from '../utils';

class RegBusiness extends Component{
    loggedIn = loggedIn;
    state = {
        messageAdd: undefined,
        messageFail: undefined,
        nameErr: undefined,
        descErr: undefined,
        locationErr: undefined,
        categoryErr: undefined,
        disabled: false
    }
    
    handleSubmit = async (event) => {
      event.preventDefault();
      
      const name = event.target.name.value;
      const desc = event.target.desc.value;
      const location = event.target.location.value;
      const category = event.target.category.value;
      this.setState({disabled: "disabled"});

      const regBusiness = response => {
        if (response.hasOwnProperty('message') && response.message === "Business created successfully"){
          this.setState({ messageAdd: response.message });
        } 
        if (response.hasOwnProperty('msg')){
            this.props.history.push({
                pathname: '/login',
                state: {
                    'success': "Please log in to continue",
                }
            });
        }
        else {
            this.setState ({
                messageFail: response.hasOwnProperty('message') && response['message'],
                nameErr: response.hasOwnProperty('name-error') && response['name-error'],
                descErr: response.hasOwnProperty('description-error') && response['description-error'],
                locationErr: response.hasOwnProperty('location-error') && response['location-error'],
                categoryErr: response.hasOwnProperty('category-error') && response['category-error'],
                disabled: false
            });
        }
      };
      await fetch('https://wc-app-api.herokuapp.com/api/v1/businesses', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.loggedIn()
            },
            body: JSON.stringify(
                {
                    "name": name,
                    "description": desc,
                    "location": location,
                    "category": category
                }
            )
        })
        .then((resp) => resp.json())
        .then(regBusiness)
        .catch(function (error) {
            console.log('Request failed due to', error);
        });
    }
}

export default RegBusiness;