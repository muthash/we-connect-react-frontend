import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/indexBody.css';

const IndexBody = () => (
  <div>
    <section id="home" className="main">
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-7 col-xs-12 col-md-offset-3 col-sm-offset-0">
            <div className="home-thumb">
              <h1>
                Welcome to WeConnect
              </h1>
              <h2>
                Your Favourite Business Directory
              </h2>
              <p>
                WeConnect provides a platform that brings businesses and individuals together. This platform creates
                awareness for businesses and gives the users the ability to write reviews about the businesses they
                have interacted with.
              </p>
              <Link to="/listings" className="section-btn btn btn-success">
                View business listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default IndexBody;