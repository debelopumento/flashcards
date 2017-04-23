import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from '../actions/actionIndex';

class NewCard extends PureComponent {
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

    componentWillMount() {
        this.props.hideCurrentDeck();
    }
    componentWillUnmount() {
        this.props.showCurrentDeck();
    }

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

export default connect(
    storeState => ({
        hideDeck: storeState.hideDeck,
    }),
    {
        hideCurrentDeck: actions.hideCurrentDeck,
        showCurrentDeck: actions.showCurrentDeck,
    }
)(NewCard);
