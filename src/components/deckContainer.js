import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

const { array } = PropTypes;
class DeckContainer extends PureComponent {
  static PropTypes = {
    decks: array,
  };
  state = {
    decks: [],
  };

  render() {
    const decks = this.props.decks;
    const decksDisplay = Object.keys(decks).map((deckId, index) => {
      const deck = decks[deckId];
      return (
        <li key={index}>
          <Link to={`/${deck.deckId}`}>{deck.deckName}</Link>
          <Link to={`/editdeck/${deck.deckId}-${deck.deckName}`}>
            Edit Deck
          </Link>
        </li>
      );
    });

    return (
      <div className="DeckContainer">

        <ul>
          {decksDisplay}
        </ul>

      </div>
    );
  }
}

export default connect(storeState => ({
  decks: storeState.decks,
}))(DeckContainer);
