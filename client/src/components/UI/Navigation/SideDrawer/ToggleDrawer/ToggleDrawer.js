import React from 'react';

import classes from './ToggleDrawer.css';

const ToggleDrawer = props => (
  <div className={classes.ToggleDrawer} onClick={props.toggle}>
    <div />
    <div />
    <div />
  </div>
);

export default ToggleDrawer;
