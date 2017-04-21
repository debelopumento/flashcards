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

const allReducers = combineReducers({
    facebookId: facebookIdReducer,
});

export default allReducers;
