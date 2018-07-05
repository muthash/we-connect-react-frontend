import React from 'react';

import Navbar from '../Navbar';
import ListingBody from './ListingBody';
import Footer from '../Footer';

class ListingPage extends React.Component{
    render(){
        return(
          <div>
            <Navbar />
            <ListingBody />
            <Footer />
          </div>
        );
      }
}

export default ListingPage;