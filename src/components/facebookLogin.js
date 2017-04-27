import React from 'react';
import FacebookLogin from 'react-facebook-login';
import reactCSS from 'reactcss';
import store from '../store';
import * as actions from '../actions/actionIndex';

const responseFacebook = response => {
    console.log('successful login');
    location.reload();
};

const FacebookLoginButton = () => (
    <FacebookLogin
        appId="1914617068781649"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="my-facebook-button-class"
        icon="fa-facebook fa-2x"
    />
);

export default FacebookLoginButton;
