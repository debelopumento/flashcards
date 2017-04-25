import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';

class Card extends PureComponent {
    state = {
        cardFront: '',
        cardBack: '',
        redirect: false,
        deckId: this.props.match.params.deck,
        cardId: '',
        type: this.props.match.params.card === undefined
            ? 'newCard'
            : 'editCard',
    };

    cardFront = event => {
        const cardFront = event.target.value;
        this.setState({ cardFront });
        console.log(1, cardFront);
        //this.state.cardFront = cardFront;
    };
    cardBack = event => {
        const cardBack = event.target.value;
        this.setState({ cardBack });
        //this.state.cardBack = cardBack;
    };

    submit = event => {
        const cardFront = this.state.cardFront !== ''
            ? this.state.cardFront
            : this.props.editCard.cardFront;
        const cardBack = this.state.cardBack;
        const newCard = {
            cardFront,
            cardBack,
            decks: [
                {
                    deckId: this.state.deckId,
                },
            ],
        };
        console.log(2, newCard, this.state.type);
        if (this.state.type === 'newCard') {
            this.props.createNewCard(newCard);
        } else {
            this.props.editCardAction(this.props.editCard._id, newCard);
        }
        this.setState({ redirect: true });
    };

    componentWillMount() {
        this.props.hideCurrentDeck();

        if (this.state.type === 'editCard') {
            this.props.loadEditedCard();
        }
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
                <Link to="/">Home</Link>
                <input
                    type="text"
                    onChange={this.cardFront}
                    placeholder={
                        this.state.type === 'editCard'
                            ? this.props.editCard.cardFront
                            : 'Flashcard Front'
                    }
                />
                <input
                    type="text"
                    onChange={this.cardBack}
                    placeholder={
                        this.state.type === 'editCard'
                            ? this.props.editCard.cardBack
                            : 'Flashcard Back'
                    }
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
