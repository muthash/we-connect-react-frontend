import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../static/img/logo.png'

const Navbar = () => (
    <div>
        <nav className="navbar transparent navbar-expand-lg navbar-dark fixed-top nav-color">
          <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logo} width="50" height="40" className="d-inline-block align-top" alt="WeConnect"/>
            </Link>
            <button className="navbar-toggler navbar-toggler-right" type="button" 
                    data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home
                            <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/">About</Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link" to="/">About</Link>
                    </li>
                </ul>
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="">Sign in</Link>
                    <span className="navbar-text">or</span>
                    <Link className="nav-item nav-link" to="/register">Sign up</Link>
                </div>
            </div>
          </div>
        </nav>
    </div>   
);

export default Navbar;