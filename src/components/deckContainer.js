import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Route, Link } from 'react-router-dom';

const Deck = ({ match }) => {
  console.log(15);
  return (
    <div>
      hellooo
    </div>
  );
};

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
          <Link to={`/${deck.deckName}`}>{deck.deckName}</Link>
        </li>
      );
    });

    return (
      <div className="DeckContainer">
        <ul>
          {decksDisplay}
        </ul>

        <Route exact path="/deckA" component={Deck} />

      </div>
    );
  }
}

export default connect(storeState => ({
  decks: storeState.decks,
}))(DeckContainer);
