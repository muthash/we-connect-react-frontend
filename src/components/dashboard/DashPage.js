import React, {Component} from 'react';
 
import Navdash from '../Navdash';
import DashBody from './DashBody';
import DeleteBiz from './DeleteBiz';


class DashPage extends Component {
  constructor(){
    super();
    this.username= localStorage.getItem('username');
  }
  
  state = {
    businessName: '',
    description: '',
    messageAdd: undefined,
    messageFail: undefined,
    nameErr: undefined,
    descErr: undefined,
    locationErr: undefined,
    categoryErr: undefined,
    disabled: false,
    business: []
  }

  componentDidMount() {
    const getBusiness = response => {
      if (response.hasOwnProperty('businesses')){
        this.setState({business: response.businesses});
      } 
      else if (response.hasOwnProperty('msg')){
        this.props.history.push({
            pathname: '/login',
            state: {
                'success': "Please log in to continue",
            }
        });
      }
      else {
        return false;
      }
    };
    fetch('https://wc-app-api.herokuapp.com/api/v1/user-business', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loggedIn()
      }
    })
    .then((resp) => resp.json())
    .then(getBusiness)
    .catch();
  }
  
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    const { businessName, description } = this.state;
    const location= event.target.location.value;
    const category= event.target.category.value;
    this.setState({disabled: "disabled"});

    const regBusiness = response => {
      if (response.hasOwnProperty('message') && response.message === "Business created successfully"){
        this.componentDidMount();
        this.setState({ 
          businessName: '', 
          description: '',
          messageAdd: response.message , 
          disabled: false,
          messageFail: undefined,
          nameErr: undefined,
          descErr: undefined,
          locationErr: undefined,
          categoryErr: undefined
        });
      } 
      else if (response.hasOwnProperty('msg')){
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
    const registrationFail = () => {
      this.setState ({
        messageFail: "Business registration attempt failed. Try Again",
        disabled: false
        });
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
                  "name": businessName,
                  "description": description,
                  "location": location,
                  "category": category
              }
          )
      })
      .then((resp) => resp.json())
      .then(regBusiness)
      .catch(registrationFail);
  }

  loggedIn() {
    // Checks if there is a saved token
    const token = localStorage.getItem('wcToken');
    if (token === null) {
      this.props.history.push({
        pathname: '/login',
        state: {
          'success': "Please log in to continue",
        }
      });
      } else{
          return token;
      }
  }

  render(){
    const {messageAdd, messageFail, nameErr, descErr, locationErr, categoryErr, disabled, business} = this.state;
    let businesses = business.map((biz) => {
      return (
        <DeleteBiz 
          key={biz['business_id']}
          id={biz['business_id']}          
          name={biz['business_name']}
          desc={biz['description']}
          location={biz['location']}
          category={biz['category']}
          posted={biz['created_by']}
          reload={this.state.business}
          history={this.props.history}
        />
    );
    });
    return(
      <div>
        <Navdash 
          username={this.username}
          home="active"
        />
        <DashBody 
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          messageAdd={messageAdd}
          messageFail={messageFail}
          nameErr={nameErr}
          descErr={descErr}
          locationErr={locationErr}
          categoryErr={categoryErr}
          disabled={disabled}
          businesses={businesses}
          state={this.state}
        />
      </div>
    );
  }
}

export default DashPage;