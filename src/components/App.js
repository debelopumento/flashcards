/*global FB*/

import React, { Component } from 'react';
import FacebookLoginButton from './facebookLogin';
import store from '../store';
import * as actions from '../actions/actionIndex';
import './App.css';
import DeckContainer from './deckContainer';

class App extends Component {
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
  }

  render() {
    return (
      <div className="App">
        <FacebookLoginButton />
        <DeckContainer />
      </div>
    );
  }
}

export default App;
