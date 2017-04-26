import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import Card from './card';
import reactCSS from 'reactcss';
import config from '../config';

const WIDTH = config.width;
const { array, number } = PropTypes;

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
    display: '',
    cardPadding: '30%',
  };

  flipcard = () => {
    this.setState({ showFront: !this.state.showFront });
  };

  no = () => {
    this.props.goToNextCard();
    this.setState({ showFront: true });
  };

  yes = () => {
    this.props.passCard(this.props.cardIndex);
    this.setState({ showFront: true });
  };

  deleteCard = () => {
    if (
      confirm('Are you sure you want to delete this flashcard permanently?')
    ) {
      this.props.deleteCard(
        this.props.cards[this.props.cardIndex]._id,
        this.props.cardIndex
      );
    }
  };

  componentWillMount() {
    const deckId = this.props.match.params.deck;
    this.props.lookupDeck(deckId);
    this.props.showCurrentDeck();
  }
  componentWillUnmount() {
    this.props.unloadCards();
  }
  componentDidUpdate() {
    if (this.props.cards.length > 0) {
      const display = this.state.showFront === true
        ? this.props.cards[this.props.cardIndex].cardFront
        : this.props.cards[this.props.cardIndex].cardBack;
      this.setState({
        display: display,
      });
      const displayLength = display.length;
      const cardWidth = WIDTH / 30;
      const lineNumber = Math.ceil(displayLength / cardWidth);
      if (lineNumber === 0) {
        lineNumber++;
      }
      const paddingTop = 140 - (lineNumber - 1) * 35;
      this.setState({
        cardPadding: paddingTop,
      });
      console.log(15, cardWidth, displayLength, lineNumber, paddingTop);
    }
  }

  render() {
    const styles = reactCSS({
      default: {
        deck: {
          height: '100%',
        },
        navBar: {
          height: 40,
          width: '100%',
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: 30,
          paddingBottom: 0,
        },
        button_home: {
          color: '#4a4c52',
          paddingLeft: 20,
          float: 'center',
        },
        button_addCard: {
          float: 'right',
        },
        cardContainer: {
          width: '100%',
          height: 350,
          display: 'table',
        },
        textArea: {
          height: '100%',
          width: '95%',
          paddingTop: this.state.cardPadding,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#4a4c52',
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          color: 'white',
          resize: 'none',
          border: 0,
          fontSize: 60,
        },

        buttonContainer: {
          width: '100%',
          textAlign: 'center',
        },

        button_editCard: {
          marginTop: 300,
          marginLeft: '80%',
          position: 'absolute',
          color: 'white',
          float: 'left',
        },
        button_deleteCard: {
          backgroundColor: '#4a4c52',
          border: 'none',
          marginTop: 287,
          marginLeft: '88%',
          position: 'absolute',
          color: 'white',
          float: 'left',
        },
        button_cross: {
          borderRadius: '100%',
          border: 'none',
          backgroundColor: '#ff795b',
          color: 'white',
          fontSize: 60,
          width: 120,
          height: 120,
          margin: 15,
        },
        button_check: {
          borderRadius: '100%',
          border: 'none',
          backgroundColor: '#02ddba',
          color: 'white',
          fontSize: 60,
          width: 120,
          height: 120,
          margin: 15,
        },
        congrats: {
          width: '90%',
          paddingTop: 200,
          fontSize: 30,
          display: 'block',
          padding: 15,
          color: '#4a4c52',
          textAlign: 'center',
          float: 'center',
        },
        congratSpan: {
          marginTop: 30,
          display: 'block',
          color: '#02ddba',
          textDecoration: 'none',
        },
      },
    });
    if (
      this.props.cardsLoaded &&
      this.props.hideDeck === false &&
      this.props.cards.length > 0
    ) {
      return this.props.finishedDeck === true
        ? <div style={styles.congrats}>
            <span style={styles.congratSpan}>
              Congratulations!
              <br />You have finished this deck.
            </span>
            <span style={styles.congratSpan}>
              <Link style={styles.button_home} to="/">
                <i className="fa fa-home fa-2x" aria-hidden="true" />
              </Link>
            </span>

          </div>
        : <div style={styles.deck}>
            <div style={styles.navBar}>
              <span>
                <Link style={styles.button_home} to="/">
                  <i className="fa fa-home fa-2x" aria-hidden="true" />

                </Link>
              </span>
              <span>
                <Link
                  style={styles.button_home}
                  to={`/${this.props.match.params.deck}/newCard`}
                >
                  <i className="fa fa-plus-square-o fa-2x" aria-hidden="true" />
                </Link>
              </span>
            </div>

            <div style={styles.cardContainer}>
              <Link
                style={styles.button_editCard}
                to={
                  `/${this.props.match.params.deck}/editCard/${this.props.cards[this.props.cardIndex]._id}`
                }
              >
                <i className="fa fa-pencil-square-o fa-lg" aria-hidden="true" />
              </Link>
              <button
                style={styles.button_deleteCard}
                onClick={this.deleteCard}
                type="submit"
              >
                <i className="fa fa-trash-o fa-lg" aria-hidden="true" />
              </button>
              <textArea
                style={styles.textArea}
                onClick={this.flipcard}
                type="submit"
                value={this.state.display}
              />
            </div>
            <div style={styles.buttonContainer}>
              <input
                style={styles.button_cross}
                onClick={this.no}
                type="submit"
                value="✘"
              />
              <input
                style={styles.button_check}
                onClick={this.yes}
                type="submit"
                value="✔"
              />
            </div>
          </div>;
    } else if (this.props.cardsLoaded && this.props.cards.length === 0) {
      return (
        <div>
          <span style={{ display: 'block' }}>
            There are no flashcards in this deck.
          </span>
          <Link to={`/${this.props.match.params.deck}/newCard`}>
            Add a New Card
          </Link>
        </div>
      );
    } else
      return <div />;
  }
}

export default connect(
  storeState => ({
    decks: storeState.decks,
    cards: storeState.cards,
    cardIndex: storeState.cardIndex,
    finishedDeck: storeState.finishedDeck,
    hideDeck: storeState.hideDeck,
    cardsLoaded: storeState.cardsLoaded,
  }),
  {
    lookupDeck: actions.lookupDeck,
    goToNextCard: actions.goToNextCard,
    passCard: actions.passCard,
    hideCurrentDeck: actions.hideCurrentDeck,
    showCurrentDeck: actions.showCurrentDeck,
    deleteCard: actions.deleteCard,
    unloadCards: actions.unloadCards,
  }
)(Deck);
