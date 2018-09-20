import React from 'react';
import { Link } from 'react-router-dom';
import { BtnLogout } from '../../Login/BtnLogout.js'

const HeaderMain = props => (
  <header>
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 col-xs-12">
          <img className="logo" src="/assets/img/logo.png" />
        </div>
        <div className="col-lg-4 col-xs-8">
          <button id="btn-logout" className="btn-primary" onClick={props.onClickLogout}>Logout</button>
        </div>
      </div>
    </div>
  </header>
);

export default HeaderMain;
