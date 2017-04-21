import axios from 'axios';
import store from '../store';

const host = process.env.NODE_ENV === 'production'
    ? window.location.href
    : 'http://localhost:8080/';

export const updateFacebookId = facebookId => ({
    type: 'UPDATE_FACEBOOKID',
    payload: facebookId,
});
