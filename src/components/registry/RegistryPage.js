import React, {Component} from 'react';
import { Link } from 'react-router-dom';
 
import Navbar from '../Navdash';
import RegistryBody from './RegistryBody';
import Paginate from './Paginate';
import {loggedIn} from '../utils';
import biz from '../../static/img/biz.jpg';

const Business = (props) => (
  <div className="col-md-3">
    <div className="block">
      <div className="thumbnail">
        <img src={biz} alt="" className="img-responsive" />
        <div className="caption">
          <h1>{props.name}</h1>
          <p>Location: <strong>{props.location} </strong></p>
          <p>Category: <strong>{props.category} </strong></p>
          <Link to={`/businesses/${props.id}`} className="btn">View More</Link>
        </div>
      </div>
    </div>
  </div>
);

class RegistryPage extends Component{
  constructor(){
    super();
    this.username= localStorage.getItem('username');
    this.loggedIn = loggedIn;
  }
  state = {
    business: [],
    nextPage: null,
    pages: 1,
    prevPage: null,
    currentPage: 0
  }
  
  componentDidMount() {
    this.handleGet(); 
  }

  handleGet = async () => {
    const getBusiness = response => {
      if (response.hasOwnProperty('businesses')){
        let businesses = response.businesses.map((biz) => {
          return(<Business
            key={biz['business_id']}
            id={biz['business_id']}          
            name={biz['business_name']}
            desc={biz['description']}
            location={biz['location']}
            category={biz['category']}
            posted={biz['created_by']}
            />
        );});

        this.setState({
          business: businesses,
          nextPage: response.next_page,
          pages: response.pages,
          prevPage: response.prev_page,
          currentPage: response.current - 1
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
        return false;
      }
    };
    fetch(`https://wc-app-api.herokuapp.com/api/v1/businesses?limit=4&page=${this.state.currentPage+1}`, {
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
  
  mapBusiness = response => {
    let business = response.businesses ? response.businesses : false;
    let businesses = business ? business.map((biz) => {
      return(<Business
          key={biz['business_id']}
          id={biz['business_id']}          
          name={biz['business_name']}
          desc={biz['description']}
          location={biz['location']}
          category={biz['category']}
          posted={biz['created_by']}
          />
      );}) : this.componentDidMount();

      this.setState({
        business: businesses
      });
  }

  handleSearch = async (event) => {
    event.preventDefault();
    const search = event.target.search.value;
    fetch(`https://wc-app-api.herokuapp.com/api/v1/search?q=${search}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loggedIn()
      }
    })
    .then((resp) => resp.json())
    .then(this.mapBusiness);
  }

  handleFilter = async (event) => {
    event.preventDefault();
    const cat = event.target.category.value;
    const loc = event.target.location.value;
    fetch(`https://wc-app-api.herokuapp.com/api/v1/businesses?cat=${cat}&loc=${loc}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.loggedIn()
      }
    })
    .then((resp) => resp.json())
    .then(this.mapBusiness);
  }

  handlePageChanged = ( newPage ) => {
    this.setState({ currentPage: newPage}, () => {this.handleGet();});  
  }

  render(){
   return(
    <div>
      <Navbar 
        username={this.username}
        listings="active"
      />
      <RegistryBody 
        state={this.state}
        handleSearch={this.handleSearch}
        handleFilter={this.handleFilter}
      />
      <Paginate
        nextPage={this.state.nextPage}
        prevPage={this.state.prevPage}
        pages={this.state.pages}
        currentPage={this.state.currentPage}
        handlePageChanged={this.handlePageChanged}
      />
    </div>
   );
 }
}

export default RegistryPage;