import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';

class Card extends PureComponent {
    state = {
        cardFront: '',
        cardBack: '',
        redirect: false,
        deckId: this.props.match.params.deck,
        cardId: '',
        type: this.props.match.params.card === undefined
            ? 'newCard'
            : 'editCard',
    };

    cardFront = event => {
        const cardFront = event.target.value;
        this.setState({ cardFront });
    };
    cardBack = event => {
        const cardBack = event.target.value;
        this.setState({ cardBack });
    };

    submit = event => {
        const cardFront = this.state.cardFront !== ''
            ? this.state.cardFront
            : this.props.editCard.cardFront;
        const cardBack = this.state.cardBack !== ''
            ? this.state.cardBack
            : this.props.editCard.cardBack;
        const newCard = {
            cardFront,
            cardBack,
            decks: [
                {
                    deckId: this.state.deckId,
                },
            ],
        };
        if (this.state.type === 'newCard') {
            this.props.createNewCard(newCard);
        } else {
            this.props.editCardAction(this.props.editCard._id, newCard);
        }
        this.setState({ redirect: true });
    };

    componentWillMount() {
        this.props.hideCurrentDeck();
        if (this.state.type === 'editCard') {
            this.props.loadEditedCard();
        }
    }

    componentWillUnmount() {
        this.props.showCurrentDeck();
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
                    height: 400,
                    paddingTop: 100,
                    textAlign: 'center',
                },
                input: {
                    height: 80,
                    width: '96%',
                    border: '1px #cccccc solid',
                    fontSize: 30,
                    color: '#555555',
                    borderRadius: 2,
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    margin: 'auto',
                    marginTop: 20,
                },
                button: {
                    display: 'block',
                    height: 80,
                    width: 'calc(96% + 3px)',
                    fontSize: 20,
                    backgroundColor: '#02ddba',
                    border: 0,
                    borderRadius: 2,
                    color: 'white',
                    margin: 'auto',
                    marginTop: 15,
                    fontSize: 30,
                },
            },
        });
        if (this.state.redirect) {
            const mode = this.props.practiceMode === true
                ? 'practice'
                : 'study';
            return <Redirect to={`/${mode}/${this.state.deckId}`} />;
        }

        return (
            <div>
                <div style={styles.navBar}>
                    <Link style={styles.button_home} to="/">
                        <i className="fa fa-home fa-2x" aria-hidden="true" />
                    </Link>
                </div>
                <div style={styles.inputArea}>
                    <input
                        style={styles.input}
                        type="text"
                        onChange={this.cardFront}
                        placeholder={
                            this.state.type === 'editCard'
                                ? this.props.editCard.cardFront
                                : 'Flashcard Front'
                        }
                    />
                    <input
                        style={styles.input}
                        type="text"
                        onChange={this.cardBack}
                        placeholder={
                            this.state.type === 'editCard'
                                ? this.props.editCard.cardBack
                                : 'Flashcard Back'
                        }
                    />
                    <input
                        style={styles.button}
                        type="submit"
                        value="Submit"
                        onClick={this.submit}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    storeState => ({
        hideDeck: storeState.hideDeck,
        editCard: storeState.editCard,
        practiceMode: storeState.practiceMode,
    }),
    {
        hideCurrentDeck: actions.hideCurrentDeck,
        showCurrentDeck: actions.showCurrentDeck,
        createNewCard: actions.createNewCard,
        loadEditedCard: actions.loadEditedCard,
        editCardAction: actions.editCardAction,
    }
)(Card);
