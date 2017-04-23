import { combineReducers } from 'redux';
import store from '../store';

const facebookIdReducer = (state = null, action) => {
    switch (action.type) {
        case 'UPDATE_FACEBOOKID': {
            return action.payload;
        }
        default:
            return state;
    }
};

const decksReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_DECKS': {
            return action.payload;
        }
        default:
            return state;
    }
};

const cardsReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_CARDS': {
            return action.payload;
        }
        default:
            return state;
    }
};

const userIdReducer = (state = '', action) => {
    switch (action.type) {
        case 'LOAD_USERID': {
            return action.payload;
        }
        default:
            return state;
    }
};

const cardIndexReducer = (state = 0, action) => {
    switch (action.type) {
        case 'UPDATE_CARD_INDEX': {
            return action.payload;
        }
        default:
            return state;
    }
};

const finishedDeckReducer = (state = false, action) => {
    switch (action.type) {
        case 'FINISHED_DECK': {
            return true;
        }
        default:
            return state;
    }
};

const allReducers = combineReducers({
    userId: userIdReducer,
    facebookId: facebookIdReducer,
    decks: decksReducer,
    cards: cardsReducer,
    cardIndex: cardIndexReducer,
    finishedDeck: finishedDeckReducer,
});

export default allReducers;
