import React, { PureComponent, PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actionIndex";
import { Link } from "react-router-dom";
import Card from "./card";
import reactCSS from "reactcss";
import config from "../config";
import store from "../store";
import Instruction from "./instruction";
import ProgressBar from "./progressBar";
import "../index.css";

const WIDTH = config.width;
const { array, number } = PropTypes;
class Deck_Study extends PureComponent {
  state = {
    showFront: true,
    cardFontSize: 40,
    cardFront: "",
    cardBack: ""
  };

  next = () => {
    this.props.goToNextCard();
    this.setState({ showFront: true });
  };

  last = () => {
    this.props.goToLastCard();
    this.setState({ showFront: true });
  };

  speak = () => {};

  deleteCard = () => {
    if (
      confirm("Are you sure you want to delete this flashcard permanently?")
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
    store.dispatch({ type: "SWITCH_TO_STUDY_MODE", payload: null });
  }
  componentWillUnmount() {
    this.props.unloadCards();
  }
  componentDidUpdate() {
    if (this.props.cards.length > 0) {
      const cardFront = this.props.cards[this.props.cardIndex].cardFront;
      const cardBack = this.props.cards[this.props.cardIndex].cardBack;
      this.setState({
        cardFront,
        cardBack
      });
      const displayLength = cardFront.length > cardBack.length
        ? cardFront.length
        : cardBack.length;
      const cardWidth = WIDTH / 32;
      const lineNumber = Math.ceil(displayLength / cardWidth);
      if (lineNumber === 0) {
        lineNumber++;
      }
      const cardFontSize = 40 - lineNumber * 4;
      this.setState({
        cardFontSize: cardFontSize
      });
    }
  }

  render() {
    const styles = reactCSS({
      default: {
        deck: {
          height: "100%"
        },
        navBar: {
          height: 40,
          width: "100%",
          backgroundColor: "white",
          textAlign: "center",
          paddingTop: 30,
          paddingBottom: 0
        },
        button_home: {
          color: "#4a4c52",
          paddingLeft: 20,
          float: "center"
        },
        button_addCard: {
          float: "right"
        },
        cardContainer: {
          width: "100%",
          height: 350,
          paddingLeft: 0,
          backgroundColor: "#4a4c52",
          textAlign: "center"
        },
        cardFront: {
          height: "42%",
          width: "92%",
          paddingTop: 15,
          padding: 15,
          color: "white",
          textAlign: "left",
          fontSize: 40,
          borderBottom: "1px solid white"
        },
        cardBack: {
          height: "42%",
          width: "92%",
          paddingTop: 15,
          padding: 15,
          color: "#ddd",
          textAlign: "left",
          fontSize: this.state.cardFontSize
        },

        buttonContainer: {
          width: "100%",
          textAlign: "center"
        },

        button_editCard: {
          marginLeft: "20",
          color: "#4a4c52"
        },
        button_deleteCard: {
          marginLeft: "20",
          color: "#4a4c52"
        },

        button_nav: {
          borderRadius: 25,
          border: "2px solid #02ddba",
          color: "#02ddba",
          fontSize: 60,
          width: 90,
          margin: 15
        },
        congrats: {
          width: "90%",
          paddingTop: 200,
          fontSize: 30,
          display: "block",
          padding: 15,
          color: "#4a4c52",
          textAlign: "center",
          float: "center"
        },
        congratSpan: {
          marginTop: 30,
          display: "block",
          color: "#02ddba",
          textDecoration: "none"
        }
      }
    });
    if (
      this.props.cardsLoaded &&
      this.props.hideDeck === false &&
      this.props.cards.length > 0
    ) {
      return this.props.finishedDeck === true
        ? <div className="main">
            <div style={styles.congrats}>
              <span style={styles.congratSpan}>
                Congratulations!
                <br />
                You have finished this deck. Click on the button below to go back to the main screen.
              </span>
              <span style={styles.congratSpan}>
                <Link style={styles.button_home} to="/">
                  <i className="fa fa-home fa-2x" aria-hidden="true" />
                </Link>
              </span>
            </div>
          </div>
        : <div className="main">
            <div style={styles.deck}>
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
                    <i
                      className="fa fa-plus-square-o fa-2x"
                      aria-hidden="true"
                    />
                  </Link>
                </span>
                <span>
                  <Link
                    style={styles.button_editCard}
                    to={`/${this.props.match.params.deck}/editCard/${this.props.cards[this.props.cardIndex]._id}`}
                  >
                    <i
                      className="fa fa-pencil-square-o fa-2x"
                      aria-hidden="true"
                    />
                  </Link>
                </span>
                {/*
              <span>
                  <i 
                  style={styles.button_deleteCard}
                  onClick={this.speak}
                  className="fa fa-volume-up fa-2x" aria-hidden="true"></i>
              </span>
            */}
                <span>
                  <i
                    style={styles.button_deleteCard}
                    className="fa fa-trash-o fa-2x"
                    aria-hidden="true"
                    onClick={this.deleteCard}
                  />
                </span>

              </div>

              <div style={styles.cardContainer}>
                <div style={styles.cardFront}>
                  {this.state.cardFront}
                </div><br />
                <div style={styles.cardBack}>
                  {this.state.cardBack}
                </div>
              </div>
              <div style={styles.buttonContainer}>
                <i
                  style={styles.button_nav}
                  className="fa fa-arrow-left"
                  aria-hidden="true"
                  onClick={this.last}
                />
                <i
                  style={styles.button_nav}
                  className="fa fa-arrow-right"
                  aria-hidden="true"
                  onClick={this.next}
                />
              </div>
              <p style={{ color: "#666666" }}>
                There are
                {" "}
                <span style={{ color: "#28d5ea" }}>
                  {this.props.cards.length}
                </span>
                {" "}
                cards in this deck
                <br />
                You are studying card
                {" "}
                <span style={{ color: "#02ddba" }}>
                  {this.props.cardIndex + 1}
                </span>
              </p>
            </div>
          </div>;
    } else if (
      this.props.cardsLoaded &&
      this.props.cards.length === 0 &&
      this.props.hideDeck === false
    ) {
      return (
        <div className="main">
          <span
            style={{
              display: "block",
              padding: 40,
              fontSize: 30,
              color: "#4a4c52"
            }}
          >
            There are no flashcards in this deck. Click on the button below to add a new card.
          </span>
          <span>
            <Link
              style={styles.button_home}
              to={`/${this.props.match.params.deck}/newCard`}
            >
              <i className="fa fa-plus-square-o fa-4x" aria-hidden="true" />
            </Link>
          </span>

        </div>
      );
    } else return <div />;
  }
}

export default connect(
  storeState => ({
    decks: storeState.decks,
    cards: storeState.cards,
    cardIndex: storeState.cardIndex,
    finishedDeck: storeState.finishedDeck,
    hideDeck: storeState.hideDeck,
    cardsLoaded: storeState.cardsLoaded
  }),
  {
    lookupDeck: actions.lookupDeck,
    goToNextCard: actions.goToNextCard,
    passCard: actions.passCard,
    hideCurrentDeck: actions.hideCurrentDeck,
    showCurrentDeck: actions.showCurrentDeck,
    deleteCard: actions.deleteCard,
    unloadCards: actions.unloadCards,
    goToLastCard: actions.goToLastCard
  }
)(Deck_Study);
