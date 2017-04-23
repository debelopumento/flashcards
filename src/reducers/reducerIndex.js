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
        case 'GO_TO_NEXT_CARD': {
            const cardNumber = store.getState().cards.length;
            if (state === cardNumber - 1) {
                return 0;
            } else
                return state + 1;
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
});

export default allReducers;
