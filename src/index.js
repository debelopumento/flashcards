import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import App from './components/App';
import NewDeck from './components/newDeck';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Main</Link></li>
                    <li><Link to="/newDeck">New Deck</Link></li>
                </ul>
                <hr />
                <Route exact path="/" component={App} />
                <Route exact path="/newDeck" component={NewDeck} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
