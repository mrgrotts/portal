import React from 'react';

import classes from './FloatingButton.css';

const FloatingButton = props => (
  <div>
    <button className={classes.FloatingButton} disabled={props.disabled} onClick={props.clicked}>
      <i className="material-icons">{props.children}</i>
    </button>
  </div>
);

export default FloatingButton;
