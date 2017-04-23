import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from '../actions/actionIndex';

class NewCard extends PureComponent {
    state = {
        cardFront: '',
        cardBack: '',
        redirect: false,
        deckId: '',
    };

    cardFront = event => {
        const cardFront = event.target.value;
        this.setState({ cardFront: cardFront });
    };
    cardBack = event => {
        const cardBack = event.target.value;
        this.setState({ cardBack: cardBack });
    };

    submit = event => {
        const cardFront = this.state.cardFront;
        const cardBack = this.state.cardBack;
        const newCard = {
            cardFront: cardFront,
            cardBack: cardBack,
            decks: [
                {
                    deckId: this.state.deckId,
                },
            ],
        };
        console.log(15, newCard);
        this.props.createNewCard(newCard);
        this.setState({ redirect: true });
    };

    componentWillMount() {
        this.setState({ deckId: this.props.match.params.deck });
        this.props.hideCurrentDeck();
    }
    componentWillUnmount() {
        this.props.showCurrentDeck();
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/${this.state.deckId}`} />;
        }

        return (
            <div>
                <input
                    type="text"
                    onChange={this.cardFront}
                    placeholder="Flashcard Front"
                />
                <input
                    type="text"
                    onChange={this.cardBack}
                    placeholder="Flashcard Back"
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
        createNewCard: actions.createNewCard,
    }
)(NewCard);
