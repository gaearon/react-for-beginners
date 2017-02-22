import React from 'react';
/* we are only importing the named render() method because we do not need the entire ReactDOM package. */
import { render } from 'react-dom';
import './css/style.css';
import App from './components/App';

import StorePicker from './components/StorePicker';

/* render out component. then what DOM element should it render out to?  */
render(<App/>, document.querySelector('#main'));
