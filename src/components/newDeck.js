import React, { PureComponent } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import store from "../store";
import * as actions from "../actions/actionIndex";
import reactCSS from "reactcss";
import "../index.css";

class NewDeck extends PureComponent {
    state = {
        deckName: "",
        redirect: false
    };

    handleChange = event => {
        const deckName = event.target.value;
        this.setState({ deckName: deckName });
    };

    _handleKeyPress = event => {
        if (event.key === "Enter") {
            this.submit();
        }
    };

    submit = event => {
        const deckName = this.state.deckName;
        store.dispatch(actions.createDeck(deckName));
        this.setState({ redirect: true });
    };

    render() {
        const styles = reactCSS({
            default: {
                navBar: {
                    height: 40,
                    paddingTop: 20,
                    paddingBottom: 0,
                    textAlign: "center"
                },
                button_home: {
                    float: "center",
                    color: "#4a4c52",
                    padding: 10
                },
                inputArea: {
                    height: 400
                },
                input: {
                    display: "block",
                    height: 80,
                    width: "96%",
                    border: "1px #cccccc solid",
                    color: "#555555",
                    borderRadius: 2,
                    textAlign: "center",
                    margin: "auto",
                    marginTop: 100,
                    fontSize: 30
                },
                button: {
                    display: "block",
                    height: 80,
                    width: "calc(96% + 3px)",
                    backgroundColor: "#02ddba",
                    border: 0,
                    borderRadius: 2,
                    color: "white",
                    margin: "auto",
                    marginTop: 15,
                    fontSize: 30
                }
            }
        });
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div className="main">
                <div style={styles.navBar}>
                    <Link style={styles.button_home} to="/">
                        <i className="fa fa-home fa-2x" aria-hidden="true" />
                    </Link>
                </div>
                <div style={styles.inputArea}>
                    <input
                        style={styles.input}
                        type="text"
                        onChange={this.handleChange}
                        placeholder="Enter Deck Name"
                        onKeyPress={this._handleKeyPress}
                    />
                    <input
                        style={styles.button}
                        type="submit"
                        value="Submit"
                        onClick={this.submit}
                    />
                </div>
            </div>
        );
    }
}

export default NewDeck;
