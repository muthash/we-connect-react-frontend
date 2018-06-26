import React, {Component} from 'react';
import { Link } from 'react-router-dom';


const Navdash = () => (
  <div>
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/dashboard">WeConnect</Link>
        </div>
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav">
            <li className="active">
              <Link to="/dashboard">Home</Link>
            </li>
            <li>
              <Link to="/businesses">Business listings</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile
                <span className="caret" />
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/change-password">Change password</Link></li>
                <li><Link to="#">Settings</Link></li>
                <li role="separator" className="divider"></li>
                <li><Link to="/logout">logout</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  
  );
  
  export default Navdash;