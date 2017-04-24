import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import store from '../store';
import * as actions from '../actions/actionIndex';

class NewDeck extends PureComponent {
    state = {
        deckName: '',
        redirect: false,
    };

    handleChange = event => {
        const deckName = event.target.value;
        this.setState({ deckName: deckName });
    };

    submit = event => {
        const deckName = this.state.deckName;
        store.dispatch(actions.createDeck(deckName));
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Enter Deck Name"
                />
                <input type="submit" value="Submit" onClick={this.submit} />
            </div>
        );
    }
}

export default NewDeck;
