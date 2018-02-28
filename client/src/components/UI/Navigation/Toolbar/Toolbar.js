import React from 'react';

import Logo from '../../../Logo/Logo';
import MenuItems from '../MenuItems/MenuItems';

import ToggleDrawer from '../SideDrawer/ToggleDrawer/ToggleDrawer';

import classes from './Toolbar.css';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Toolbar__Logo}>
      <Logo />
      <h3 style={{ color: 'white', fontWeight: '300', marginBottom: '1.25rem' }}>Rozalado Services</h3>
    </div>
    <ToggleDrawer toggle={props.toggle} />
    <nav className={classes.DesktopOnly}>
      <MenuItems isAuthenticated={props.isAuthenticated} verified={props.verified} company={props.company} />
    </nav>
  </header>
);

export default Toolbar;
