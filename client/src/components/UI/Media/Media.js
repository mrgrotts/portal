import React, { Component } from 'react';

import Auxiliary from '../../../hoc/Auxiliary';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Media.css';

const Media = props => (
  <Auxiliary>
    <div className={classes.Media}>{props.content}</div>
  </Auxiliary>
);

export default Media;
