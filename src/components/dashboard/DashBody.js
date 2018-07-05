import React from 'react';
import '../../static/css/custom.css';
import '../../static/css/indexBody.css';



const DashBody = ({handleSubmit, handleChange, messageAdd, messageFail, nameErr, descErr, locationErr, categoryErr, disabled, businesses, state}) => (
  <div>
    <section className="dash">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Manage Your Businesses Dashboard</h3>
              </div>
              <div className="panel-body">
                <div className="col-md-8 col-sm-10 col-xs-10">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr className="info">
                        <th scope="col">Business name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    {businesses}
                  </table>
                </div>
                <div className="col-md-4 col-sm-10 col-xs-10">
                  {messageFail && <div className="alert alert-danger" role="alert">{messageFail}</div>}
                  {messageAdd && <div className="alert alert-success" role="alert">{messageAdd}</div>}
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <p><strong>Add new business</strong></p>
                      
                      <form onSubmit={handleSubmit} className="col-md-11">
                        <div className="form-group">
                          <label htmlFor="name">Business name</label>
                          <input 
                            type="text" 
                            name="businessName" 
                            className="form-control"
                            value={state.businessName}
                            onChange={handleChange}
                          />
                          {nameErr && <div className="invalid-feedback">{nameErr}</div>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="name">Business description</label>
                          <textarea 
                            name="description" 
                            className="form-control" 
                            rows="3"
                            value={state.description}
                            onChange={handleChange}
                          />
                          {descErr && <div className="invalid-feedback">{descErr}</div>}
                        </div>
                        <div className="form-group">
                          <select name="location" className="form-group form-control" onChange={handleChange}>
                            <option value="">Select location</option>
                            <option value="Nairobi">Nairobi</option>
                            <option value="Mombasa">Mombasa</option>
                            <option value="Kisumu">Kisumu</option>
                            <option value="Eldoret">Eldoret</option>
                          </select>
                          {locationErr && <div className="invalid-feedback">{locationErr}</div>}
                        </div>
                        <div className="form-group">
                          <select name="category" className="form-group form-control" onChange={handleChange}>
                            <option value="">Select category</option>
                            <option value="Advertising">Advertising</option>
                            <option value="Agribusiness">Agribusiness</option>
                            <option value="Gambling & Betting">Gambling & Betting </option>
                            <option value="Photography">Photography</option>
                          </select>
                          {categoryErr && <div className="invalid-feedback">{categoryErr}</div>}
                        </div>
                        <button type="submit" className="btn btn-info" disabled={disabled}>
                          {disabled ? 'Adding Business ...' : 'Add business'}
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

export default DashBody;