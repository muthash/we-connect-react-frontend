import React, {Component} from 'react';
 
import Navdash from '../Navdash';
import BusinessBody from './BusinessBody';
import {loggedIn} from '../utils';

const Reviews = (props) => (
  <div>
      <div>{props.date}</div>
      <strong>{props.review}</strong>
      <div>Rating: <strong>{props.rating}</strong></div>
      <div className="pull-right">Posted by: <strong>{props.reviewer}</strong></div>
    <hr /> 
  </div>
);

class BusinessPage extends Component {
  constructor(){
    super();
    this.username= localStorage.getItem('username');
    this.loggedIn = loggedIn;
  }

  state = {
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
  
  componentDidMount(){
    this.getBusiness();
  }

  getBusiness = async (event) => {
    // event.preventDefault();
    
    const id = this.props.match.params.id;
    
    const displayBusiness = response => {
      if (response.hasOwnProperty('business')){
          let reviews = response.reviews.map((rev) => {
            return(<Reviews
                key={rev['review_id']}
                review={rev['review']}
                rating={rev['rating']}
                date={rev['date']}
                reviewer={rev['reviewer']}
              />
          );});
          this.setState ({
            business: response.business,
            reviews: reviews,
            numberOfReviews: response.number_of_reviews
          });
       }
    };
    
    await fetch('https://wc-app-api.herokuapp.com/api/v1/businesses/'+ id, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loggedIn()
      }
    })
    .then((resp) => resp.json())
    .then(displayBusiness)
    .catch(function(err){
      console.log('Fetch Error :-S', err);
    });
  }
  
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleReview = async (event) => {
    event.preventDefault();
    
    const id = this.props.match.params.id;
    const { description } = this.state;
    const rating = event.target.rating.value;
    this.setState({disabled: "disabled"});

    const postReview = response => {
      if (response.hasOwnProperty('message') && response.message === "Review for business with id "+ id +" created"){
        this.getBusiness();
        this.setState({messageAdd: "Review for business created"});
      }
      else if (response.hasOwnProperty('msg')){
        this.props.history.push({
            pathname: '/login',
            state: {
                'success': "Please log in to continue",
            }
        });
      }
      else{
        this.setState({messageFail: response.message, descErr: response['description-error'], disabled: false});
      }
    };
    await fetch('https://wc-app-api.herokuapp.com/api/v1/businesses/'+ id +'/reviews', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loggedIn()
      },
      body: JSON.stringify(
        {
            "description": description,
            "rating": rating
        }
    )
    })
    .then((resp) => resp.json())
    .then(postReview);
  }

  render(){
    return(
      <div>
        <Navdash 
          username={this.username}
        />
        <BusinessBody 
          handleReview={this.handleReview}
          handleChange={this.handleChange}
          business_id={this.state.business.business_id} 
          business_name={this.state.business.business_name}
          category={this.state.business.category}
          created_by={this.state.business.create_by}
          description={this.state.business.description}
          location={this.state.business.location}
          reviews={this.state.reviews}
          reviewsNo={this.state.numberOfReviews}
          messageFail={this.state.messageFail}
          state={this.state}
        />
      </div>  
    )
  }
}


export default BusinessPage;