/*global FB*/

import React, { PureComponent, PropTypes } from 'react';
import FacebookLoginButton from './facebookLogin';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from '../actions/actionIndex';
import DeckContainer from './deckContainer';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';
import LandingPage from './landingPage';
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
  }

  render() {
    const styles = reactCSS({
      default: {
        navBar: {
          height: 40,
          paddingTop: 20,
          paddingBottom: 0,
          textAlign: 'center',
        },
        icon: {
          float: 'center',
          color: '#4a4c52',
          padding: 10,
        },
      },
    });

    if (this.props.logedIn === true) {
      return (
        <div className="App">
          <div style={styles.navBar}>
            <Link to="/newDeck" style={styles.icon}>
              Create a New Deck
            </Link>
          </div>
          <DeckContainer />

        </div>
      );
    } else {
      return (
        <div className="App">
          <LandingPage />
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
