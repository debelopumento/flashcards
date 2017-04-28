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
        if (i === swappingDeckIndex) {
          newDecks[deckIndex] = oldDecks[swappingDeckIndex];
        } else if (i === deckIndex) {
          newDecks[swappingDeckIndex] = oldDecks[deckIndex];
        } else {
          newDecks[i] = oldDecks[i];
        }
      }
      this.props.updateDecks(newDecks);
      this.props.rearrangeDecks({ decks: newDecks });
    } else
      alert('Cannot move the first deck up!');
  };

  moveDown = event => {
    const deckIndex = parseInt(event.target.id);
    const oldDecks = this.props.decks;
    let newDecks = [];
    let swappingDeckIndex;
    if (deckIndex < oldDecks.length - 1) {
      swappingDeckIndex = deckIndex + 1;
      for (let i = 0; i < oldDecks.length; i++) {
        if (i === swappingDeckIndex) {
          newDecks[deckIndex] = oldDecks[swappingDeckIndex];
        } else if (i === deckIndex) {
          newDecks[swappingDeckIndex] = oldDecks[deckIndex];
        } else {
          newDecks[i] = oldDecks[i];
        }
      }
      this.props.updateDecks(newDecks);
      this.props.rearrangeDecks({ decks: newDecks });
    } else
      alert('Cannot move the last deck down');
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
          color: '#fbfbfb',
          fontSize: 40,
        },
        deckLink: {
          color: '#fbfbfb',
          fontSize: 15,
          marginRight: 10,
        },
        iconContainer: {
          paddingRight: 20,
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
            <p style={styles.deckName}>{deck.deckName}</p>
            <Link style={styles.deckLink} to={`/practice/${deck.deckId}`}>
              Practice Mode
            </Link>
            <Link style={styles.deckLink} to={`/study/${deck.deckId}`}>
              Study Mode
            </Link>
          </span>
          <div style={styles.iconContainer}>
            <span
              style={{
                color: 'white',
                fontSize: 30,
                display: 'block',
                textAlign: 'center',
              }}
              id={index}
            >
              <i
                id={index}
                className="fa fa-caret-up fa-lg"
                aria-hidden="true"
                onClick={this.moveUp}
              />

            </span>
            <span
              style={{
                color: 'white',
                display: 'block',
                textAlign: 'center',
                paddingLeft: 5,
              }}
            >
              <Link
                style={styles.icon}
                to={`/editdeck/${deck.deckId}-${deck.deckName}`}
              >
                <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />

              </Link>
            </span>
            <span
              style={{
                color: 'white',
                fontSize: 30,
                display: 'block',
                textAlign: 'center',
              }}
              id={index}
              className="down"
            >
              <i
                id={index}
                className="fa fa-caret-down fa-lg"
                aria-hidden="true"
                onClick={this.moveDown}
              />

            </span>
          </div>
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
