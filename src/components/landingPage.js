import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import store from '../store';
import * as actions from '../actions/actionIndex';
import reactCSS from 'reactcss';
import FacebookLoginButton from './facebookLogin';
import CopyToClipboard from 'react-copy-to-clipboard';
class LandingPage extends PureComponent {
    copied = () => {
        console.log('copied');
    };
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
                    color: '#aaa',
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
        //let clipboard = new Clipboard('.btn');

        return (
            <div style={styles.page}>
                <div style={styles.navBar} />
                <div style={styles.main}>
                    <div style={styles.title}>Virtual Flashcards</div>
                    <FacebookLoginButton />
                    <div style={styles.demo}>
                        <p>
                            Demo Account:
                            <br />Email: oehpujksqa_1493162709@tfbnw.net

                            <br /><CopyToClipboard
                                text="oehpujksqa_1493162709@tfbnw.net"
                            >
                                <input
                                    style={styles.button}
                                    type="submit"
                                    value="Copy to clipboard"
                                    onClick={this.copied}
                                />
                            </CopyToClipboard>
                            <br />Password: demo
                        </p>
                    </div>
                </div>
                <div style={styles.footer} />
            </div>
        );
    }
}

export default LandingPage;
