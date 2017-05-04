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

const WIDTH = config.width;
class Deck_Review extends PureComponent {
  state = {
    showFront: true,
    display: "",
    cardFontSize: 50
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

  toggleInstruction = () => {
    this.props.toggleInstruction();
  };

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
    store.dispatch({ type: "SHOW_INSTRUCTION", paylaod: null });
    store.dispatch({ type: "SWITCH_TO_PRACTICE_MODE", paylaod: null });
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
        display: display
      });
      const displayLength = display.length;
      const cardWidth = WIDTH / 32;
      const lineNumber = Math.ceil(displayLength / cardWidth);
      if (lineNumber === 0) {
        lineNumber++;
      }
      const cardFontSize = 60 - lineNumber * 4;
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
          display: "table"
        },
        textArea: {
          height: "100%",
          width: "100%",
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: "#4a4c52",
          display: "table-cell",
          verticalAlign: "middle",
          textAlign: "center",
          color: "white",
          border: 0,
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
        button_cross: {
          borderRadius: "100%",
          border: "none",
          backgroundColor: "#ff795b",
          color: "white",
          fontSize: 60,
          width: 120,
          height: 120,
          margin: 15
        },
        button_check: {
          borderRadius: "100%",
          border: "none",
          backgroundColor: "#02ddba",
          color: "white",
          fontSize: 60,
          width: 120,
          height: 120,
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
        ? <div style={styles.congrats}>
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
        : <div style={styles.deck}>
            <Instruction />
            <div style={styles.navBar}>
              <span>
                <i
                  style={{
                    marginLeft: 20,
                    color: "#4a4c52"
                  }}
                  className="fa fa-question-circle fa-2x"
                  aria-hidden="true"
                  onClick={this.toggleInstruction}
                />
              </span>
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

              <span>

                <i
                  style={styles.button_deleteCard}
                  className="fa fa-trash-o fa-2x"
                  aria-hidden="true"
                  onClick={this.deleteCard}
                />

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

            </div>

            <div style={styles.cardContainer}>

              <span
                style={styles.textArea}
                onClick={this.flipcard}
                type="submit"
              >
                {this.state.display}
              </span>
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
            <ProgressBar />
          </div>;
    } else if (
      this.props.cardsLoaded &&
      this.props.cards.length === 0 &&
      this.props.hideDeck === false
    ) {
      return (
        <div>
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
    cardsLoaded: storeState.cardsLoaded,
    showInstruction: storeState.showInstruction
  }),
  {
    lookupDeck: actions.lookupDeck,
    goToNextCard: actions.goToNextCard,
    passCard: actions.passCard,
    hideCurrentDeck: actions.hideCurrentDeck,
    showCurrentDeck: actions.showCurrentDeck,
    deleteCard: actions.deleteCard,
    unloadCards: actions.unloadCards,
    toggleInstruction: actions.toggleInstruction
  }
)(Deck_Review);
