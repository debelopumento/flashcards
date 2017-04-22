import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
    console.log(11, decks);
    const decksDisplay = Object.keys(decks).map((deckId, index) => {
      const deck = decks[deckId];
      console.log(12, deckId, index, deck);
      return (
        <li key={index}>
          {deck.deckName}
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
const Deck = ({ match }) => (
  <div>
    <h3>{match.params.deckName}</h3>
  </div>
);

export default connect(storeState => ({
  decks: storeState.decks,
}))(DeckContainer);
