import React from 'react';

import Navbar from '../Navbar';
import IndexBody from './IndexBody';
import Footer from '../Footer';

const IndexPage = () => (
  <div>
    <Navbar wrapHome="active" />
    <IndexBody />
    <Footer />
  </div>
);

export default IndexPage;