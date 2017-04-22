import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './components/App';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('root')
);
