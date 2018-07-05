import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/custom.css';
import '../../static/css/listing.css';
import logo from '../../static/img/header.jpg'

const ListingBody = props => (
  <div>
    <section id="listing" className="main">
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-2">
            <form>
              <div className="form-group col-md-3">
                <input type="email" className="form-control input-lg" />
              </div>
              <button type="submit" className="btn btn-success btn-lg">Search</button>
            </form>
          </div>
          <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-2">
            <form>
              <div className="col-md-2">
                <select className="form-control input-lg">
                  <option>All location</option>
                  <option>Nairobi</option>
                  <option>Mombasa</option>
                  <option>Kisumu</option>
                  <option>Eldoret</option>
                </select>
              </div>
              <div className="col-md-2">
                <select className="form-control input-lg">
                  <option>All category</option>
                  <option>Advertising</option>
                  <option>Agribusiness</option>
                  <option>Gambling & Betting </option>
                  <option>Photography</option>
                </select>
              </div>
              <button type="submit" className="btn btn-success btn-lg">Filter</button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <section className="alllistings">
      <div className="container">
        <div className="row">
          <div className="panel panel-default col-sm-6 col-md-3">
            <div className="panel-body">
              <img src={logo} alt="..." className="img-thumbnail" />
            </div>
            <div className="panel-heading">
              <strong>Panel heading without title</strong>
              <Link to="#"> View Description</Link>
            </div>
            <div className="panel-footer">
              0 reviews
              <Link to="#"> Read More</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
  
  export default ListingBody;