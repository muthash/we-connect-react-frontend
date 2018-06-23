import React from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = props => (
    <div>
        <section className="masthead text-center text-white d-flex">
        <div className="container my-auto">
            <div className="row">
                <div className="col-lg-12 mx-auto">
                    <strong>
                        <p className="text-faded mb-5">Create your personal account</p>
                    </strong>
                    <div className="form-register mx-auto">
                        <form onSubmit={props.getReg}>
                            <div className="form-group">
                                <label htmlFor="UsernameInput" className="col-form-label col-form-label-sm">Username</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                    </div>
                                    <input name="username" type="text" className={props.form_style} />
                                    <div className="invalid-feedback">
                                        {props.username_error}
                                    </div>
                                </div>

                                
                                <label htmlFor="EmailInput" className="col-form-label col-form-label-sm">Email address</label>
                                <input name="email" type="email" className={props.form_style} />
                                <div className="invalid-feedback">
                                    {props.email_error}
                                </div>
                                <small id="emailHelpBlock" className="form-text text-muted">
                                    We'll occasionally send updates about your account to this inbox. We'll never share your email address with anyone.
                                </small>

                                <label htmlFor="PasswordInput" className="col-form-label col-form-label-sm">Password</label>
                                <input name="password" type="password" className={props.form_style} />
                                <div className="invalid-feedback">
                                    {props.password_error}
                                </div>
                                <small id="passwordHelpBlock" className="form-text text-muted">
                                    Use at least one lowercase letter, one numeral, and seven characters.
                                </small>

                            </div>
                            <small id="PasswordInput" className="form-text text-muted">
                                By clicking "Sign up for WeConnect", you agree to our
                                <Link to=""> Terms of service</Link> and
                                <Link to=""> Privacy policy.</Link>
                            </small>
                            <div className="form-group">
                                <button type="submit" className="btn btn-success btn btn-block" >Sign up for WeConnect</button>
                            </div>
                            <small id="PasswordInput" className="form-text text-muted align-link">
                                Already Registered?
                                <Link to="/signin"> Sign In </Link>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        
    </div>   
);

export default RegisterForm;