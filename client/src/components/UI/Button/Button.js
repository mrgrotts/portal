import React from 'react';

import classes from './Button.css';

const Button = props => (
  <button
    className={[classes.Button, classes[props.ButtonType]].join(' ')}
    disabled={props.disabled}
    onClick={props.clicked}
    type={props.type}
  >
    {props.children}
  </button>
);

export default Button;
