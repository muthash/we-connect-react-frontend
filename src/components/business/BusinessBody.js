import React from 'react';
import '../../static/css/indexBody.css';

const BusinessBody = ({handleReview, reviews, business_name, description, location, category, handleChange, state}) => (
  <div>
    <section className="dash">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Business Details</h3>
              </div>
              <div className="panel-body">
                <div className="col-md-8 col-sm-12 col-xs-12">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3><strong>{business_name}</strong></h3>
                    </div>
                    <div className="panel-body">
                      <div className="thumbnail">
                        <div>Business Description </div>
                        <strong>{description}</strong>
                      </div>
                      <div className="thumbnail">
                        <div>Location:</div>
                        <h4>{location} </h4>
                        <div>Category: </div>
                        <h4>{category} </h4>
                      </div>
                      <div className="thumbnail">
                        <h4>Reviews:</h4>
                        <div>Number of reviews: <strong>{state.numberOfReviews}</strong></div>
                        <hr />
                        {reviews}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-12 col-xs-12">
                  <div className="panel panel-default">
                    <div className="panel-body">
                      {state.messageFail && <div className="alert alert-danger" role="alert">{state.messageFail}</div>}
                      {state.messageAdd && <div className="alert alert-success" role="alert">{state.messageAdd}</div>}
                      <p><strong>Add new review</strong></p>
                      <form className="col-md-11" onSubmit={handleReview}>
                        <div className="form-group">
                          <label htmlFor="description">Comment</label>
                          <textarea 
                            name="description" 
                            className="form-control" 
                            rows="3"
                            value={state.description}
                            onChange={handleChange}
                          />
                          {state.descErr && <div className="invalid-feedback">{state.descErr}</div>}
                        </div>
                        <div className="form-group">
                          <label htmlFor="rating">Select Rating</label>
                          <select name="rating" className="form-group form-control">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn-info" disabled={state.disabled}>
                          {state.disabled ? 'Adding Review ...' : 'Add review'}
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

export default BusinessBody;