import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';

const { array, number, bool, object, string } = PropTypes;

class Deck extends PureComponent {
    static PropTypes = {
        cards: array,
        cardIndex: number,
    };

    static defaultProps = {
        cards: null,
        cardIndex: 0,
    };

    state = {
        showFront: true,
    };

    flipcard = () => {
        this.setState({ showFront: !this.state.showFront });
    };

    no = () => {
        this.props.goToNextCard();
    };

    yes = () => {
        this.props.goToNextCard();
    };

    componentWillMount() {
        const deckId = this.props.match.params.deck;
        this.props.lookupDeck(deckId);
    }
    componentDidUpdate() {}

    render() {
        if (this.props.cards.length !== 0) {
            const display = this.state.showFront === true
                ? this.props.cards[this.props.cardIndex].cardFront
                : this.props.cards[this.props.cardIndex].cardBack;

            return (
                <div>
                    <input
                        onClick={this.flipcard}
                        type="submit"
                        value={display}
                    />
                    <input onClick={this.no} type="submit" value="no" />
                    <input onClick={this.yes} type="submit" value="yes" />
                </div>
            );
        }
        return <div />;
    }
}

export default connect(
    storeState => ({
        decks: storeState.decks,
        cards: storeState.cards,
        cardIndex: storeState.cardIndex,
    }),
    {
        lookupDeck: actions.lookupDeck,
        goToNextCard: actions.goToNextCard,
    }
)(Deck);
