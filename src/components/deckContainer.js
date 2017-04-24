import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DeckContainer extends PureComponent {
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
