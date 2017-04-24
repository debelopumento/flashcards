import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

import store from '../store';
import * as actions from '../actions/actionIndex';

class Card extends PureComponent {
    state = {
        cardFront: '',
        cardBack: '',
        redirect: false,
        deckId: '',
        cardId: '',
        type: '',
    };

    cardFront = event => {
        const cardFront = event.target.value;
        //this.setState({ cardFront: cardFront });
        this.state.cardFront = cardFront;
    };
    cardBack = event => {
        const cardBack = event.target.value;
        //this.setState({ cardBack: cardBack });
        this.state.cardBack = cardBack;
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
        console.log(23, newCard);
        if (this.state.type === 'newCard') {
            this.props.createNewCard(newCard);
        } else {
            this.props.editCardAction(this.props.editCard._id, newCard);
        }
        this.setState({ redirect: true });
    };

    componentWillMount() {
        this.setState({ deckId: this.props.match.params.deck });
        this.props.hideCurrentDeck();
        const type = this.props.match.params.card === undefined
            ? 'newCard'
            : 'editCard';

        this.state.type = type;
        if (this.state.type === 'editCard') {
            this.props.loadEditedCard();
        }
    }

    componentDidUpdate() {
        this.setState({ cardFront: this.props.editCard.cardFront });
        this.setState({
            cardFront: this.state.type === 'editCard'
                ? this.props.editCard.cardFront
                : 'Flashcard Front',
            cardBack: this.state.type === 'editCard'
                ? this.props.editCard.cardBack
                : 'Flashcard Back',
        });
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
                    placeholder={this.state.cardFront}
                />
                <input
                    type="text"
                    onChange={this.cardBack}
                    placeholder={this.state.cardBack}
                />
                <input type="submit" value="Submit" onClick={this.submit} />
            </div>
        );
    }
}

export default connect(
    storeState => ({
        hideDeck: storeState.hideDeck,
        editCard: storeState.editCard,
    }),
    {
        hideCurrentDeck: actions.hideCurrentDeck,
        showCurrentDeck: actions.showCurrentDeck,
        createNewCard: actions.createNewCard,
        loadEditedCard: actions.loadEditedCard,
        editCardAction: actions.editCardAction,
    }
)(Card);
