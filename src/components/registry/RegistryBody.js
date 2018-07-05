import React from 'react';
import '../../static/css/indexBody.css';

const RegistryBody = ({state, handleSearch, handleFilter}) => (
  <div>
    <section className="dash">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Business Listings</h3>
              </div>
              <div className="panel-body">
                <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-2">
                  <form onSubmit={handleSearch}>
                    <div className="form-group col-md-6">
                      <div className="input-group">
                        <input type="text" name="search" className="form-control" placeholder="Search for..." />
                        <span className="input-group-btn">
                          <button type="submit" className="btn btn-info">Search!</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="clear" />
                <div className="col-md-12 col-sm-12 col-xs-12 col-md-offset-2">
                  <form onSubmit={handleFilter}>
                    <div className="form-group col-md-3">
                      <select name="location" className="form-control">
                        <option value="">All location</option>
                        <option value="Nairobi">Nairobi</option>
                        <option value="Mombasa">Mombasa</option>
                        <option value="Kisumu">Kisumu</option>
                        <option value="Eldoret">Eldoret</option>
                      </select>
                    </div>
                    <div className="input-group  col-md-3">
                      <select name="category" className="form-control">
                        <option value="">All category</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Agribusiness">Agribusiness</option>
                        <option value="Gambling & Betting">Gambling & Betting </option>
                        <option value="Photography">Photography</option>
                      </select>
                      <span className="input-group-btn">
                        <button type="submit" className="btn btn-info">Filter!</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="featured-block">
          <div className="row">
            {state.business}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default RegistryBody;