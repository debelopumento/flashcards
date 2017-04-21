import { combineReducers } from 'redux';

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

const allReducers = combineReducers({
    facebookId: facebookIdReducer,
    decks: decksReducer,
    cards: cardsReducer,
});

export default allReducers;
