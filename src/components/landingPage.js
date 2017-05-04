import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import store from '../store';
import * as actions from '../actions/actionIndex';
import reactCSS from 'reactcss';
import FacebookLoginButton from './facebookLogin';
import CopyToClipboard from 'react-copy-to-clipboard';

class LandingPage extends PureComponent {
    demoLogin = () => {
        store.dispatch(actions.updateFacebookId('101984600370648'));
        store.dispatch(actions.lookupUser('101984600370648'));
        store.dispatch({ type: 'LOGIN', payload: null });

    }
    render() {
        const HEIGHT = screen.height;
        const styles = reactCSS({
            default: {
                page: {
                    height: HEIGHT,
                },
                navBar: {
                    height: '10%',
                    paddingTop: 20,
                    paddingBottom: 0,
                    textAlign: 'center',
                    backgroundColor: '#4a4c52',
                },
                main: {
                    height: '75%',
                    paddingTop: 30,
                },
                demo: {
                    paddingTop: 100,
                    color: '#aaa',
                    fontSize: 12,
                },
                button: {
                    color: 'white',
                    backgroundColor: '#02ddba',
                    border: 0,
                    borderRadius: 60,
                    width: 80,
                    height: 80,
                    fontSize: 16,
                    marginTop: 35,
                },
                title: {
                    color: '#4a4c52',
                    fontSize: 60,
                    padding: 10,
                },

                footer: {
                    height: '10%',
                    backgroundColor: '#4a4c52',
                    verticalAlign: 'bottom',
                },
            },
        });

        return (
            <div style={styles.page}>
                <div style={styles.navBar} />
                <div style={styles.main}>
                    <div style={styles.title}>Virtual Flashcards</div>
                    <FacebookLoginButton />
                    <div><input style={styles.button} type="submit" value="Demo" onClick={this.demoLogin}/></div>
                </div>

                <div style={styles.footer} />
            </div>
        );
    }
}

export default connect(
  storeState => ({}),
  {
    updateFacebookId: actions.resetDeck,
    updateNameOnServer: actions.updateNameOnServer,
    lookupUser: actions.lookupUser,
  }
)(LandingPage);
