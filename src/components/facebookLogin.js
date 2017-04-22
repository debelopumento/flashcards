import React from 'react';
import FacebookLogin from 'react-facebook-login';
import store from '../store';
import * as actions from '../actions/actionIndex';

const responseFacebook = response => {
    const facebookId = response.id;
};

const FacebookLoginButton = () => (
    <FacebookLogin
        appId="1914617068781649"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
    />
);

export default FacebookLoginButton;
