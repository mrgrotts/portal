import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/rozalado.svg';
import classes from './Logo.css';

const Logo = () => (
  <div className={classes.Logo}>
    <Link to="/">
      <img src={logo} alt="Rozalado Services" />
    </Link>
  </div>
);

export default Logo;
