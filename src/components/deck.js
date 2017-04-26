import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
        },
        card: {
          textAlign: 'center',
          backgroundColor: '#4a4c52',
          color: 'white',
          height: '100%',
          width: '100%',
          border: 0,
          fontSize: 70,
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
      },
    });
    if (
      this.props.cardsLoaded &&
      this.props.hideDeck === false &&
      this.props.cards.length > 0
    ) {
      console.log('deck not empty');
      return this.props.finishedDeck === true
        ? <div>
            <span>Congratulations! You have finished this deck.</span>
            <span>
              <Link to="/">Back to dashboard</Link>
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
              <input
                style={styles.card}
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
      console.log('deck empty');

      return (
        <div>

          <Link to={`/${this.props.match.params.deck}/newCard`}>
            Add a New Card
          </Link>
          <span>There are no flashcards in this deck.</span>
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
