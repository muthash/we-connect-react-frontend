import React from "react";

import {loggedIn} from '../utils';
import '../../static/css/loader.css';

class Logout extends React.Component {
  loggedIn = loggedIn
  
  componentDidMount() {
    fetch('https://wc-app-api.herokuapp.com/api/v1/logout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.loggedIn()}`
      }
    }).then(response => {
      if (response.status === 200) {
        localStorage.clear();
        window.location.assign("/login");
      }
      else{
        localStorage.clear();
        window.location.assign("/login");
      }
    });
  }

  render() {
    return (
      <div className="container" id="cont">
        <div className="row">
          <div className="text-center">
            <h2>WeConnect</h2>
          </div>    
          <div className="animationload">
            <div className="osahanloading" />
          </div>
        </div>
      </div>
    );
  }
}

export default Logout;