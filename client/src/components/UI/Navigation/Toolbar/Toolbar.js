import React from "react";

import Logo from "../../../Logo/Logo";
import MenuItems from "../MenuItems/MenuItems";

import ToggleDrawer from "../SideDrawer/ToggleDrawer/ToggleDrawer";

import classes from "./Toolbar.css";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div className={classes.Toolbar__Logo}>
      <Logo />
    </div>
    <ToggleDrawer toggle={props.toggle} />
    <nav className={classes.DesktopOnly}>
      <MenuItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

export default Toolbar;
