import React, {Component} from 'react';
import {loggedIn} from '../utils';
 
import Navdash from '../Navdash';
import '../../static/css/custom.css';
import '../../static/css/indexBody.css';



const UpdateBody = ({handleSubmit, handleChange, state, name, desc}) => (
  <div>
    <section className="dash">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Dashboard</h3>
              </div>
              <div className="panel-body">
                <div className="col-md-5 col-sm-10 col-xs-10 col-md-offset-3">
                  {state.messageFail && <div className="alert alert-danger" role="alert">{state.messageFail}</div>}
                  {state.messageAdd && <div className="alert alert-success" role="alert">{state.messageAdd}</div>}
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <p><strong>Update your business</strong></p>
                      <div>Update only the fields that need to be updated</div>
                      <form onSubmit={handleSubmit} className="col-md-11">
                        <div className="form-group">
                          <label htmlFor="name">Business name</label>
                          <input 
                            type="text" 
                            name="businessName"
                            id="businessName" 
                            className="form-control"
                            placeholder={name}
                            value={state.businessName}
                            onChange={handleChange}   
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Business description</label>
                          <textarea 
                            name="description" 
                            className="form-control" 
                            rows="3"
                            placeholder={desc}
                            value={state.description}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <select name="location" className="form-group form-control" onChange={handleChange}>
                            <option value="">Select location</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Kisumu">Kisumu</option>
                            <option value="Eldoret">Eldoret</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <select name="category" className="form-group form-control" onChange={handleChange}>
                            <option value="">Select category</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Agribusiness">Agribusiness</option>
                            <option value="Gambling & Betting">Gambling & Betting </option>
                            <option value="Photography">Photography</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-info" disabled={state.disabled}>
                          {state.disabled ? 'Updating Business ...' : 'Edit business'}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);




class DashPage extends Component {
  constructor(){
    super();
    this.username= localStorage.getItem('username');
    this.loggedIn= loggedIn
  }
  
  state = {
    businessName: '',
    description: '',
    messageAdd: undefined,
    messageFail: undefined,
    disabled: false,
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    
    if (this.props.location.state === undefined){
      window.location.assign('/dashboard');
    }

    const { businessName, description } = this.state;
    const location= event.target.location.value;
    const category= event.target.category.value;
    const id = this.props.match.params.id;
    this.setState({disabled: "disabled"});

    const updateBusiness = response => {
      if (response.hasOwnProperty('message') && response.message === "Business updated successfully"){
        this.props.history.push('/dashboard');
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
        this.setState({messageFail: response.message, disabled: false});
      }
    }
    
    await fetch('https://wc-app-api.herokuapp.com/api/v1/businesses/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.loggedIn()
            },
            body: JSON.stringify(
                {
                    "name": businessName === "" ? this.props.location.state.name : businessName,
                    "description": description === "" ? this.props.location.state.desc : description,
                    "location": location === "" ? this.props.location.state.loc : location,
                    "category": category === "" ? this.props.location.state.cat : category
                }
            )
        })
        .then((resp) => resp.json())
        .then(updateBusiness)
        .catch(function (error) {
            console.log('Request failed due to', error);
        });
    }

  render(){
    const {messageAdd, messageFail} = this.state;
    return(
      <div>
        <Navdash 
          username={this.username}
        />
         <UpdateBody
           name={this.props.location.state === undefined ? "" : this.props.location.state.name}
           desc={this.props.location.state === undefined ? "" : this.props.location.state.desc}
           handleSubmit={this.handleSubmit}
           handleChange={this.handleChange}
           messageAdd={messageAdd}
           messageFail={messageFail}
           state={this.state}
        />
      </div>
    );
  }
}

export default DashPage;