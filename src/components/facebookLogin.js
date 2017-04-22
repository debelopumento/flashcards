import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = response => {
    console.log('successful login');
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
