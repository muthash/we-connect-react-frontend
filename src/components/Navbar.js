import React from 'react';
import { Link } from 'react-router-dom';
import '../static/css/navbar.css';

const Navbar = ({wrapHome, wrapRegister, wrapLogin}) => (
  <div>
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="icon icon-bar" />
            <span className="icon icon-bar" />
            <span className="icon icon-bar" />
          </button>
          <Link to="/" className="navbar-brand">
            <span>
              We
            </span>
            Connect
          </Link>
        </div>
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav navbar-right">
            <li className={wrapHome}>
              <Link to="/">
                Home
              </Link>
            </li>
            <li className={wrapRegister}>
              <Link to="/register">
                Register
              </Link>
            </li>
            <li className={wrapLogin}>
              <Link to="/login">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>   
);

export default Navbar;