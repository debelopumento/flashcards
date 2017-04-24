/*global FB*/

import React, { PureComponent, PropTypes } from 'react';
import FacebookLoginButton from './facebookLogin';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from '../actions/actionIndex';
import './App.css';
import DeckContainer from './deckContainer';
import { Route, Link } from 'react-router-dom';

const { array } = PropTypes;

class App extends PureComponent {
  static PropTypes = {
    decks: array,
  };
  state = {
    decks: [],
  };

  componentWillMount() {
    // This is called with the results from from FB.getLoginStatus().
    window.fbAsyncInit = () => {
      FB.init({
        appId: '1914617068781649',
        cookie: true, // enable cookies to allow the server to access
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v2.8', // use graph api version 2.8
      });

      FB.getLoginStatus(response => {
        if (response.status === 'connected') {
          FB.api('/me', response => {
            const facebookId = response.id;
            store.dispatch({ type: 'LOGIN', payload: null });
            store.dispatch(actions.updateFacebookId(facebookId));
            store.dispatch(actions.lookupUser(facebookId));
          });
        }
      });
    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    //

    //this.props.resetDeck();
  }

  componentWillUnmount() {}

  render() {
    if (this.props.logedIn === true) {
      return (
        <div className="App">

          <Link to="/newDeck">New Deck</Link>
          <DeckContainer />

        </div>
      );
    } else {
      return (
        <div className="App">
          <FacebookLoginButton />
        </div>
      );
    }
  }
}

export default connect(
  storeState => ({
    decks: storeState.decks,
    finishedDeck: storeState.finishedDeck,
    logedIn: storeState.logedIn,
  }),
  {
    resetDeck: actions.resetDeck,
  }
)(App);
