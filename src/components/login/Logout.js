import React from "react";
import {withRouter} from "react-router-dom";
import '../../static/css/loader.css';

class Logout extends React.Component {
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

export default withRouter(Logout);