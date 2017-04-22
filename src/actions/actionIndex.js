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

export const updateUserId = userId => ({
    type: 'LOAD_USERID',
    payload: userId,
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
