import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';

const { array, number, bool, object, string } = PropTypes;

class Deck extends PureComponent {
    static PropTypes = {
        cards: array,
        index: number,
        showFront: bool,
    };

    static defaultProps = {
        cards: null,
        index: 0,
        showFront: true,
    };

    state = {
        showFront: true,
    };

    flipcard = () => {
        this.setState({ showFront: !this.state.showFront });
    };

    componentWillMount() {
        const deckId = this.props.match.params.deck;
        this.props.lookupDeck(deckId);
    }
    componentDidUpdate() {}

    render() {
        if (this.props.cards.length !== 0) {
            const display = this.state.showFront === true
                ? this.props.cards[this.props.index].cardFront
                : this.props.cards[this.props.index].cardBack;
            return (
                <div>
                    <input
                        onClick={this.flipcard}
                        type="submit"
                        value={display}
                    />
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
    }),
    {
        lookupDeck: actions.lookupDeck,
    }
)(Deck);
