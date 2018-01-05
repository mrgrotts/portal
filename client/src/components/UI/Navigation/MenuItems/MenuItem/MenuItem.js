import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './MenuItem.css';

const MenuItem = props => (
  <li className={classes.MenuItem}>
    <NavLink
      activeClassName={classes.active}
      to={props.link}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </li>
);

export default MenuItem;
