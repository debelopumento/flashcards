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
        case 'RESET_CARDS': {
            return [];
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
        case 'RESET_DECK': {
            return false;
        }
        default:
            return state;
    }
};

const hideDeckReducer = (state = false, action) => {
    switch (action.type) {
        case 'HIDE_DECK': {
            return true;
        }
        case 'SHOW_DECK': {
            return false;
        }
        default:
            return state;
    }
};

const logedInReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN': {
            return true;
        }
        default:
            return state;
    }
};

const cardsLoadedReducer = (state = false, action) => {
    switch (action.type) {
        case 'CARDS_LOADED': {
            return true;
        }
        case 'UNLOAD_CARDS': {
            return false;
        }
        default:
            return state;
    }
};

const editCardReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOAD_EDITED_CARD': {
            return action.payload;
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
    hideDeck: hideDeckReducer,
    logedIn: logedInReducer,
    cardsLoaded: cardsLoadedReducer,
    editCard: editCardReducer,
});

export default allReducers;
