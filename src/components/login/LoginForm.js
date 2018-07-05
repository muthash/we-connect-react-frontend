import React from 'react';
import { Link } from 'react-router-dom';
import '../../static/css/custom.css';
import '../../static/css/indexBody.css';


const LoginForm = ({success, handleSubmit, handleChange, handleReset, message, emailErr, passwordErr, disabled, resDisabled, state}) => (
  <div>
    <section id="home" className="main">
      <div className="overlay" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="register-thumb">
              <h1>
                Sign in to Weconnect
              </h1>
              <h2>
                This platform creates awareness for businesses and gives the users
                the ability to write reviews about the businesses they have interacted with.
              </h2>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-xs-12">
            <section className="masthead">
              <div className="form-register">
                {success && <div className="alert alert-success" role="alert">{success}</div>}
                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="col-form-label col-form-label-sm">
                      Email address
                    </label>
                    <input 
                      type="email"
                      id="useremail" 
                      name="email" 
                      className="form-control"
                      value={state.email}
                      onChange={handleChange}
                    />
                    {emailErr && <div className="invalid-feedback">{emailErr}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="PasswordInput" className="col-form-label col-form-label-sm">
                      Password
                    </label>
                    <input 
                      type="password"
                      id="userpassword" 
                      name="password"  
                      className="form-control"
                      value={state.password}
                      onChange={handleChange}
                    />
                    <small className="form-text text-muted align">
                      <Link to="#myModal" data-toggle="modal" data-target="#myModal">Forgot password?</Link>
                    </small>
                    {passwordErr && <div className="invalid-feedback">{passwordErr}</div>}
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block" disabled={disabled}>
                      {disabled ? 'Signing in ...' : 'Sign in'}
                    </button>
                    <small className="form-text text-muted align">
                      New to WeConnect?
                      <Link to="/register">
                        Create an account. 
                      </Link>
                    </small>
                  </div>  
                </form>
              </div>  
            </section>
          </div>
        </div>
      </div>
    </section>
    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Reset Password</h4>
          </div>
          {state.resFail && <div className="alert alert-danger" role="alert">{state.resFail}</div>}
          {state.resMessage && <div className="alert alert-success" role="alert">{state.resMessage}</div>}
          <form onSubmit={handleReset}>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" />
                {state.resEmailErr && <div className="invalid-feedback">{state.resEmailErr}</div>}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" disabled={resDisabled}>
                {resDisabled ? 'Sending ...' : 'Send request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default LoginForm;