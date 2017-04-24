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

export const deleteCard = (cardId, cardIndex) =>
    dispatch => {
        const url = host + 'deleteCard/' + cardId;
        return axios
            .delete(url)
            .then(data => {
                console.log('card deleted');
                dispatch(passCard(cardIndex));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const createNewCard = newCard =>
    dispatch => {
        const url = host + 'createnewcard/';
        return axios
            .post(url, newCard)
            .then(data => {
                const addedCard = data.data.newCard;
                const cards = store.getState().cards;
                cards.push(addedCard);
                dispatch(updateCards(cards));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const editCardAction = (cardId, newCard) =>
    dispatch => {
        const url = host + 'editCard/' + cardId;
        return axios
            .put(url, newCard)
            .then(data => {
                let cards = store.getState().cards;
                const cardIndex = store.getState().cardIndex;
                cards[cardIndex] = newCard;
                console.log(28);
                dispatch(updateCards(cards));
            })
            .catch(e => {
                console.log(e);
            });
    };

export const passCard = cardIndex =>
    dispatch => {
        let cards = store.getState().cards;
        if (cards.length === 1) {
            dispatch({
                type: 'FINISHED_DECK',
                payload: null,
            });
        } else {
            const cardNumber = store.getState().cards.length;
            const cardIndex = store.getState().cardIndex;
            if (cardIndex === cardNumber - 1) {
                dispatch({ type: 'UPDATE_CARD_INDEX', payload: 0 });
            } else {
                dispatch({ type: 'UPDATE_CARD_INDEX', payload: cardIndex + 1 });
            }
            cards.splice(cardIndex, 1);
            dispatch(updateCards(cards));
        }
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
            .then(() => {
                dispatch({
                    type: 'CARDS_LOADED',
                    payload: null,
                });
            })
            .catch(e => {
                console.log(e);
            });
    };

export const unloadCards = () => ({
    type: 'UNLOAD_CARDS',
    payload: null,
});

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

export const loadEditedCard = () =>
    dispatch => {
        const cards = store.getState().cards;
        const cardIndex = store.getState().cardIndex;
        const card = cards[cardIndex];
        console.log(21, card);
        dispatch({
            type: 'LOAD_EDITED_CARD',
            payload: card,
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
