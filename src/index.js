import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './static/css/bootstrap.css';
import './static/css/custom.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
