import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import 'whatwg-fetch';
import { getFromStorage } from '../utils/Storage';

const PrivateRoute = ({ component: Component }) => {
    const obj = getFromStorage('FB360_Token');
    if(obj.token){
        return (
            <Route component={Component} />
        );
    } else {
        return(
            <Redirect to={{ pathname: "/" }} />
        );
    }
};

export default PrivateRoute;