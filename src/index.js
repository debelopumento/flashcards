import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Deck from './components/deck';
import App from './components/App';
import NewDeck from './components/newDeck';
import Card from './components/card';
import './index.css';

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>

                <Route exact path="/" component={App} />
                <Route path="/:deck" component={Deck} />
                <Route path="/:deck/newCard" component={Card} />
                <Route path="/:deck/editCard/:card" component={Card} />
                <Route exact path="/newDeck" component={NewDeck} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
