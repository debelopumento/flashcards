import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';

class DeckContainer extends PureComponent {
  render() {
    const styles = reactCSS({
      default: {
        deck: {
          backgroundColor: 'black',
          color: 'white',
          height: 120,
        },
        deckName: {
          color: 'white',
        },
      },
    });
    const decks = this.props.decks;
    const decksDisplay = Object.keys(decks).map((deckId, index) => {
      const deck = decks[deckId];
      return (
        <li key={index} style={styles.deck}>
          <Link style={styles.deckName} to={`/${deck.deckId}`}>
            {deck.deckName}
          </Link>
          <Link to={`/editdeck/${deck.deckId}-${deck.deckName}`}>
            <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />

          </Link>
        </li>
      );
    });

    return (
      <div>
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
