import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';
class EditDeck extends PureComponent {
    state = {
        deckName: '',
        redirect: false,
        deckId: '',
        cardFront: '',
        cardBack: '',
    };

    handleChange = event => {
        const deckName = event.target.value;
        this.setState({ deckName: deckName });
    };

    submitChange = event => {
        const deckName = this.state.deckName;
        const deckId = this.state.deckId;
        this.props.editDeck(deckName, deckId);
        this.setState({ redirect: true });
    };

    deleteDeck = event => {
        const userId = this.props.userId;
        this.props.deleteDeck(this.state.deckId, userId);
        this.setState({ redirect: true });
    };

    cardFront = event => {
        const cardFront = event.target.value;
        this.setState({ cardFront });
    };
    cardBack = event => {
        const cardBack = event.target.value;
        this.setState({ cardBack });
    };
    submitNewCard = event => {
        const cardFront = this.state.cardFront !== ''
            ? this.state.cardFront
            : this.props.editCard.cardFront;
        const cardBack = this.state.cardBack;
        const newCard = {
            cardFront,
            cardBack,
            decks: [
                {
                    deckId: this.state.deckId,
                },
            ],
        };
        this.props.createNewCard(newCard);
        this.refs.cardInput1.value = '';
        this.refs.cardInput2.value = '';
    };

    componentDidMount() {
        const deckId = this.state.deckId;
        this.props.lookupDeck(deckId);
        this.props.hideCurrentDeck();
    }

    componentWillMount() {
        this.setState({ deckId: this.props.match.params.deckId });
        this.setState({ deckName: this.props.match.params.deckName });
    }

    render() {
        const styles = reactCSS({
            default: {
                navBar: {
                    height: 40,
                    paddingTop: 20,
                    paddingBottom: 0,
                    textAlign: 'center',
                },
                button_home: {
                    float: 'center',
                    color: '#4a4c52',
                    padding: 10,
                },
                inputArea: {
                    height: 150,
                },
                input: {
                    display: 'block',
                    height: 60,
                    width: '96%',
                    border: '1px #cccccc solid',
                    fontSize: 30,
                    color: '#555555',
                    borderRadius: 2,
                    textAlign: 'center',
                    margin: 'auto',
                    marginTop: 20,
                },
                buttonContainer: {
                    display: 'block',
                    textAlign: 'center',
                },
                button: {
                    height: 50,
                    width: '48%',
                    fontSize: 20,
                    backgroundColor: '#02ddba',
                    border: 0,
                    borderRadius: 2,
                    color: 'white',
                    margin: 2,
                    marginTop: 15,
                },
                newCardInputContainer: {
                    borderTop: '1px #eee solid',
                    width: '100%',
                    paddingTop: 15,
                    textAlign: 'center',
                    paddingBottom: 20,
                    borderBottom: '1px #eee solid',
                    marginBottom: 20,
                },
                cardInput: {
                    height: 40,
                    width: '96%',
                    border: 'solid 1px #ccc',
                    textAlign: 'center',
                    margin: 5,
                    fontSize: 15,
                },
                addNewCardButton: {
                    width: '97%',
                    height: 40,
                    backgroundColor: '#ffeb6c',
                    border: 'none',
                    borderRadius: 2,
                    textAlign: 'center',
                    color: 'white',
                    fontSize: 25,
                    marginTop: 10,
                },
                cardList: {
                    marginLeft: 15,
                    color: '#aaa',
                    width: '90%',
                    display: 'flex',
                    borderBottom: 'solid 1px #eee',
                    marginBottom: 10,
                },
                cardListCardFront: {
                    width: '50%',
                },
                cardListCardBack: {
                    width: '50%',
                    paddingBottom: 0,
                },
            },
        });

        const cards = this.props.cards;
        const cardsLength = cards.length - 1;
        const cardList = Object.keys(cards).map((cardId, index) => {
            const card = cards[cardsLength - cardId];
            return (
                <div style={styles.cardList}>
                    <div style={styles.cardListCardFront}>
                        {card.cardFront}
                    </div>
                    <div style={styles.cardListCardBack}>
                        {card.cardBack}
                    </div>
                </div>
            );
        });

        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div style={styles.navBar}>
                    <Link style={styles.button_home} to="/">
                        <i className="fa fa-home fa-2x" aria-hidden="true" />
                    </Link>
                </div>
                <div style={styles.inputArea}>
                    <div>
                        <input
                            style={styles.input}
                            type="text"
                            onChange={this.handleChange}
                            placeholder={this.state.deckName}
                        />
                    </div>
                    <div style={styles.buttonContainer}>

                        <input
                            style={styles.button}
                            type="submit"
                            value="Submit"
                            onClick={this.submitChange}
                        />
                        <input
                            style={styles.button}
                            type="submit"
                            value="Delete Deck"
                            onClick={this.deleteDeck}
                        />
                    </div>

                </div>
                <div style={styles.newCardInputContainer}>
                    <input
                        style={styles.cardInput}
                        type="text"
                        placeholder="Card Front"
                        onChange={this.cardFront}
                        ref="cardInput1"
                    />
                    <input
                        style={styles.cardInput}
                        type="text"
                        placeholder="Card Back"
                        onChange={this.cardBack}
                        ref="cardInput2"
                    />
                    <input
                        style={styles.addNewCardButton}
                        type="submit"
                        value="+"
                        onClick={this.submitNewCard}
                    />
                </div>
                <div>
                    {cardList}
                </div>
            </div>
        );
    }
}

export default connect(
    storeState => ({
        userId: storeState.userId,
        cards: storeState.cards,
    }),
    {
        editDeck: actions.editDeck,
        deleteDeck: actions.deleteDeck,
        lookupDeck: actions.lookupDeck,
        hideCurrentDeck: actions.hideCurrentDeck,
        createNewCard: actions.createNewCard,
    }
)(EditDeck);
