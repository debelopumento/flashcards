import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Deck_Review from "./components/deck-review";
import Deck_Study from "./components/deck-study";
import App from "./components/App";
import NewDeck from "./components/newDeck";
import EditDeck from "./components/editDeck";
import Card from "./components/card";
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/newDeck" component={NewDeck} />
                    <Route path="/review/:deck" component={Deck_Review} />
                    <Route path="/study/:deck" component={Deck_Study} />
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
    document.getElementById("root")
);
