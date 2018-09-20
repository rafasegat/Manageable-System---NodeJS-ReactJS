import React from 'react';
import { Link } from 'react-router-dom';
import { BtnLogout } from '../../Login/BtnLogout.js'

const HeaderLogin = () => (
  <header>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 col-xs-12">
          <img className="logo" src="assets/img/logo.png" />
        </div>
      </div>
    </div>
  </header>
);

export default HeaderLogin;
