import React from 'react';

import classes from './ProgressBar.css';

const ProgressBar = props => {
  return (
    <div className={classes.ProgressWrap}>
      <ul className={classes.ProgressBar}>
        <li className={classes.active} />
        <li className={''} />
        <li className={''} />
        <li className={''} />
        <li className={''} />
      </ul>
    </div>
  );
};

export default ProgressBar;
