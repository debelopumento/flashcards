import axios from 'axios';
import store from '../store';

const host = process.env.NODE_ENV === 'production'
    ? window.location.href
    : 'http://localhost:8080/';

export const updateFacebookId = facebookId => ({
    type: 'UPDATE_FACEBOOKID',
    payload: facebookId,
});

export const updateDecks = decks => ({
    type: 'LOAD_DECKS',
    payload: decks,
});

export const updateCards = cards => ({
    type: 'LOAD_CARDS',
    payload: cards,
});

export const passCard = cardIndex =>
    dispatch => {
        let cards = store.getState().cards;
        if (cards.length === 1) {
            dispatch({
                type: 'FINISHED_DECK',
                payload: null,
            });
        } else {
            cards.splice(cardIndex, 1);
            dispatch(updateCards(cards));
            if (cardIndex === cards.length) {
                store.dispatch({ type: 'UPDATE_CARD_INDEX', payload: 0 });
            }
        }
    };

export const updateUserId = userId => ({
    type: 'LOAD_USERID',
    payload: userId,
});

export const lookupDeck = deckId =>
    dispatch => {
        const url = host + 'deck/' + deckId;
        return axios
            .get(url)
            .then(data => {
                dispatch(updateCards(data.data.cards));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const goToNextCard = () =>
    dispatch => {
        const cardNumber = store.getState().cards.length;
        const cardIndex = store.getState().cardIndex;
        if (cardIndex === cardNumber - 1) {
            dispatch({ type: 'UPDATE_CARD_INDEX', payload: 0 });
        } else {
            dispatch({ type: 'UPDATE_CARD_INDEX', payload: cardIndex + 1 });
        }
    };

export const finishedDeck = () => ({
    type: 'FINISHED_DECK',
    payload: null,
});

export const resetDeck = () => ({
    type: 'RESET_DECK',
    payload: null,
});

export const createDeck = deckName =>
    dispatch => {
        const userId = store.getState().userId;
        const url = host + 'createDeck/' + deckName + '/' + userId;
        console.log(3, url, userId);
        return axios
            .post(url)
            .then(data => {
                const newDeck = data.data.newDeck;
                const decks = store.getState().decks;
                decks.push(newDeck);
                dispatch(updateDecks(decks));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const lookupUser = facebookId =>
    dispatch => {
        const url = host + 'main/' + facebookId;
        return axios
            .get(url)
            .then(data => {
                console.log(1, data.data.data[0]);
                dispatch(updateUserId(data.data.data[0]._id));
                dispatch(updateDecks(data.data.data[0].decks));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const hideCurrentDeck = () => ({
    type: 'HIDE_DECK',
    payload: null,
});

export const showCurrentDeck = () => ({
    type: 'SHOW_DECK',
    payload: null,
});
