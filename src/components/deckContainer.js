import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';
import * as actions from '../actions/actionIndex';

class DeckContainer extends PureComponent {
  moveUp = event => {
    const deckIndex = parseInt(event.target.id);
    const oldDecks = this.props.decks;
    let newDecks = [];
    let swappingDeckIndex;
    if (deckIndex !== 0) {
      swappingDeckIndex = deckIndex - 1;
      for (let i = 0; i < oldDecks.length; i++) {
        console.log(18, i, swappingDeckIndex, deckIndex, oldDecks);
        if (i === swappingDeckIndex) {
          newDecks[deckIndex] = oldDecks[swappingDeckIndex];
        } else if (i === deckIndex) {
          newDecks[swappingDeckIndex] = oldDecks[deckIndex];
        } else {
          newDecks[i] = oldDecks[i];
        }
        console.log(20, newDecks);
      }
      this.props.updateDecks(newDecks);
      this.props.rearrangeDecks({ decks: newDecks });
    }
  };

  moveDown = event => {
    const deckIndex = parseInt(event.target.id);
    const oldDecks = this.props.decks;
    let newDecks = [];
    let swappingDeckIndex;
    if (deckIndex < oldDecks.length - 1) {
      swappingDeckIndex = deckIndex + 1;
      for (let i = 0; i < oldDecks.length; i++) {
        console.log(19, i, swappingDeckIndex, deckIndex, oldDecks);

        if (i === swappingDeckIndex) {
          newDecks[deckIndex] = oldDecks[swappingDeckIndex];
        } else if (i === deckIndex) {
          newDecks[swappingDeckIndex] = oldDecks[deckIndex];
        } else {
          newDecks[i] = oldDecks[i];
        }
        console.log(21, newDecks);
      }
      this.props.updateDecks(newDecks);
      this.props.rearrangeDecks({ decks: newDecks });
    }
  };

  render() {
    const styles = reactCSS({
      default: {
        deckContainer: {
          marginTop: 0,
          width: '100%',
        },
        deck: {
          backgroundColor: '#4a4c52',
          width: '100%',
          display: 'table',
          height: 200,
          width: '100%',
          borderBottom: '1px white solid',
        },
        deckNameContainer: {
          width: '70%',
          verticalAlign: 'middle',
          display: 'table-cell',
          paddingLeft: 35,
          textAlign: 'left',
        },
        deckName: {
          margin: 'auto',
          textDecoration: 'none',
          color: '#fbfbfb',
          fontSize: 40,
        },
        iconContainer: {
          paddingRight: 35,
          verticalAlign: 'middle',
          display: 'table-cell',
          textAlign: 'right',
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
          <span
            style={{ color: 'red' }}
            id={index}
            className="up"
            onClick={this.moveUp}
          >
            up
          </span>
          <span
            style={{ color: 'red' }}
            id={index}
            className="down"
            onClick={this.moveDown}
          >
            down
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

export default connect(
  storeState => ({
    decks: storeState.decks,
  }),
  {
    updateDecks: actions.updateDecks,
    rearrangeDecks: actions.rearrangeDecks,
  }
)(DeckContainer);
