import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary';

import classes from './Flash.css';

const Flash = props => {
  let flash = (
    <div className={[classes.Flash, classes[props.color]].join(' ')}>
      <h3 className={classes.FlashMessage}>{props.message}</h3>
    </div>
  );

  return <Auxiliary>{flash}</Auxiliary>;
};

export default Flash;
