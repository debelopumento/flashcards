import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';

class DeckContainer extends PureComponent {
  render() {
    const styles = reactCSS({
      default: {
        deckContainer: {
          marginTop: 0,
          width: '100%',
        },
        deck: {
          backgroundColor: '#4a4c52',
          height: 200,
          width: '100%',
          borderBottom: '1px white solid',
        },
        deckNameContainer: {
          verticalAlign: 'middle',
          marginLeft: 60,
          marginRight: 10,
          padding: 15,
        },
        deckName: {
          margin: 'auto',
          textDecoration: 'none',
          color: '#fbfbfb',
          fontSize: 40,
        },
        iconContainer: {
          marginRight: 0,
          float: 'right',
          paddingRight: 30,
          paddingTop: 15,
        },
        icon: {
          color: '#fbfbfb',
          fontSize: 20,
        },
      },
    });
    const decks = this.props.decks;
    const decksDisplay = Object.keys(decks).map((deckId, index) => {
      const deck = decks[deckId];
      return (
        <div key={index} style={styles.deck}>
          <span style={styles.deckNameContainer}>
            <Link style={styles.deckName} to={`/${deck.deckId}`}>
              {deck.deckName}
            </Link>
          </span>
          <span style={styles.iconContainer}>
            <Link
              style={styles.icon}
              to={`/editdeck/${deck.deckId}-${deck.deckName}`}
            >
              <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />

            </Link>
          </span>
        </div>
      );
    });

    return (
      <div style={styles.deckContainer}>
        <p />
        {decksDisplay}
      </div>
    );
  }
}

export default connect(storeState => ({
  decks: storeState.decks,
}))(DeckContainer);
