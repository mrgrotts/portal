import React from 'react';

import Auxiliary from '../../../../hoc/Auxiliary';

import Logo from '../../../Logo/Logo';
import MenuItems from '../MenuItems/MenuItems';
import Backdrop from '../../Backdrop/Backdrop';

import classes from './SideDrawer.css';

const SideDrawer = props => {
  let toggleDrawer = [classes.SideDrawer, classes.Close];

  if (props.show) {
    toggleDrawer = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxiliary>
      <Backdrop show={props.show} clicked={props.hide} />
      <div className={toggleDrawer.join(' ')} onClick={props.hide}>
        <div className={classes.SideDrawer__Logo}>
          <Logo />
        </div>
        <nav>
          <MenuItems isAuthenticated={props.isAuthenticated} verified={props.verified} company={props.company} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;
