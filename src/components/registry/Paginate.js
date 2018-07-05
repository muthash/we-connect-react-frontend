import React, {Component} from 'react';
import Pager from 'react-pager';



class Paginate extends Component{
  state = {
          visiblePage: 8
  };
  
  render() {
    return (
      <section className="paginate">
        <div className="container">
          <div className="row">
            <div className="col-md-offset-4">
              <Pager 
                total={this.props.pages}
                current={this.props.currentPage}
                visiblePages={this.state.visiblePage}
                onPageChanged={this.props.handlePageChanged} 
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default Paginate;