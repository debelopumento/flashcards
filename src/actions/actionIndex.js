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

export const lookupUser = facebookId =>
    dispatch => {
        const url = host + 'main/' + facebookId;
        return axios
            .get(url)
            .then(data => {
                console.log(1, data.data.data[0]);
                dispatch(updateDecks(data.data.data[0].decks));
                dispatch(updateCards(data.data.data[0].cards));
            })
            .catch(e => {
                console.log(e);
            });
    };
