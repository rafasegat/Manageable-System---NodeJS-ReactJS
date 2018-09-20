// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.
// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import {
    getFromStorage
} from '../../utils/Storage'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const obj = getFromStorage('FB360_Token');
  
  return (
    <Route
      render={props =>
        obj.token ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

export default PrivateRoute