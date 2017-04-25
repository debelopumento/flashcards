import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Card from './card';
import reactCSS from 'reactcss';
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
    this.props.deleteCard(
      this.props.cards[this.props.cardIndex]._id,
      this.props.cardIndex
    );
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
        navBar: {
          height: 40,
          backgroundColor: 'white',
          textAlign: 'center',
          paddingTop: 30,
          paddingBottom: 0,
        },
        icon: {
          color: '#4a4c52',
          padding: 20,
        },
        card: {
          backgroundColor: '#4a4c52',
          color: 'white',
          height: 200,
          width: '100%',
          border: 0,
          fontSize: 70,
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
        : <div>
            <div style={styles.navBar}>
              <Link style={styles.icon} to="/">
                <i className="fa fa-home fa-2x" aria-hidden="true" />

              </Link>
            </div>
            <input
              style={styles.card}
              onClick={this.flipcard}
              type="submit"
              value={this.state.display}
            />
            <input onClick={this.no} type="submit" value="✘" />

            <input onClick={this.yes} type="submit" value="✓" />
            <input
              onClick={this.deleteCard}
              type="submit"
              value="Delete This Card"
            />
            <Link
              to={
                `/${this.props.match.params.deck}/editCard/${this.props.cards[this.props.cardIndex]._id}`
              }
            >
              Edit Card
            </Link>
            <Link to={`/${this.props.match.params.deck}/newCard`}>
              Add a New Card
            </Link>

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
