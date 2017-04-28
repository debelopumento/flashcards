import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Deck_PracticeMode from './components/deck-practiceMode';
import Deck_StudyMode from './components/deck-studyMode';

import App from './components/App';
import NewDeck from './components/newDeck';
import EditDeck from './components/editDeck';
import Card from './components/card';
import { Link } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/newDeck" component={NewDeck} />
                    <Route
                        path="/practice/:deck"
                        component={Deck_PracticeMode}
                    />
                    <Route path="/study/:deck" component={Deck_StudyMode} />

                    <Route
                        path="/editdeck/:deckId-:deckName"
                        component={EditDeck}
                    />
                    <Route path="/:deck/newCard" component={Card} />
                    <Route path="/:deck/editCard/:card" component={Card} />
                </div>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
